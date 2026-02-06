from typing import Any
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from django.contrib.auth import get_user_model
from django.db.models import Count, Sum, Q, F, QuerySet
from django.utils import timezone
from datetime import timedelta

from products.models import Product, Category
from orders.models import Order, OrderItem
from .serializers import (
    AdminDashboardStatsSerializer,
    AdminProductSerializer,
    AdminUserSerializer,
    AdminOrderSerializer,
    AdminCategorySerializer
)

User = get_user_model()


class AdminDashboardViewSet(viewsets.ViewSet):
    """ViewSet for admin dashboard statistics"""
    permission_classes = [IsAdminUser]
    
    @action(detail=False, methods=['get'])
    def stats(self, request: Request) -> Response:
        """Get dashboard statistics"""
        # Total products
        total_products = Product.objects.count()
        
        # Total orders
        total_orders = Order.objects.count()
        
        # Total users (exclude superusers)
        total_users = User.objects.filter(is_superuser=False).count()
        
        # Total revenue (from paid orders)
        total_revenue = Order.objects.filter(
            payment_status='paid'
        ).aggregate(
            total=Sum('total_amount')
        )['total'] or 0
        
        # Low stock products (less than 10)
        low_stock_products = Product.objects.filter(stock__lt=10).count()
        
        # Pending orders
        pending_orders = Order.objects.filter(
            status__in=['processing', 'pending']
        ).count()
        
        data = {
            'total_products': total_products,
            'total_orders': total_orders,
            'total_users': total_users,
            'total_revenue': float(total_revenue),
            'low_stock_products': low_stock_products,
            'pending_orders': pending_orders
        }
        
        serializer = AdminDashboardStatsSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)
    
    @action(detail=False, methods=['get'])
    def recent_orders(self, request: Request) -> Response:
        """Get recent orders"""
        recent_orders = Order.objects.select_related('user').prefetch_related('items').order_by('-created_at')[:10]
        serializer = AdminOrderSerializer(recent_orders, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def sales_analytics(self, request: Request) -> Response:
        """Get sales analytics data"""
        # Last 7 days sales
        last_7_days = timezone.now() - timedelta(days=7)
        daily_sales = Order.objects.filter(
            created_at__gte=last_7_days,
            payment_status='paid'
        ).extra(
            select={'day': 'date(created_at)'}
        ).values('day').annotate(
            total=Sum('total_amount'),
            count=Count('id')
        ).order_by('day')
        
        # Top selling products
        top_products = OrderItem.objects.values(
            'product__name', 'product__id'
        ).annotate(
            total_quantity=Sum('quantity'),
            total_revenue=Sum(F('quantity') * F('price'))
        ).order_by('-total_quantity')[:5]
        
        return Response({
            'daily_sales': list(daily_sales),
            'top_products': list(top_products)
        })


class AdminProductViewSet(viewsets.ModelViewSet):
    """ViewSet for product management"""
    queryset = Product.objects.select_related('category').all()
    serializer_class = AdminProductSerializer
    permission_classes = [IsAdminUser]
    
    def get_queryset(self) -> QuerySet[Product]:
        queryset = super().get_queryset()
        
        # Filter by low stock
        low_stock = self.request.query_params.get('filter')
        if low_stock == 'low-stock':
            queryset = queryset.filter(stock__lt=10)
        
        # Search by name
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category_id=category)
        
        # Filter by availability
        is_available = self.request.query_params.get('is_available')
        if is_available is not None:
            queryset = queryset.filter(is_available=is_available.lower() == 'true')
        
        return queryset.order_by('-created_at')
    
    @action(detail=True, methods=['post'])
    def toggle_availability(self, request: Request, pk: Any = None) -> Response:
        """Toggle product availability"""
        product = self.get_object()
        product.is_available = not product.is_available
        product.save()
        serializer = self.get_serializer(product)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_stock(self, request: Request, pk: Any = None) -> Response:
        """Update product stock"""
        product = self.get_object()
        stock = request.data.get('stock')
        
        if stock is None:
            return Response(
                {'error': 'Stock value is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            product.stock = int(stock)
            product.save()
            serializer = self.get_serializer(product)
            return Response(serializer.data)
        except ValueError:
            return Response(
                {'error': 'Invalid stock value'},
                status=status.HTTP_400_BAD_REQUEST
            )


class AdminUserViewSet(viewsets.ModelViewSet):
    """ViewSet for user management"""
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.none()
    
    def get_queryset(self) -> QuerySet[Any]:
        queryset = User.objects.annotate(
            total_orders=Count('orders'),
            total_spent=Sum('orders__total_amount', filter=Q(orders__payment_status='paid'))
        )
        
        # Search by email or name
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(email__icontains=search) |
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(username__icontains=search)
            )
        
        # Filter by staff status
        is_staff = self.request.query_params.get('is_staff')
        if is_staff is not None:
            queryset = queryset.filter(is_staff=is_staff.lower() == 'true')
        
        # Filter by active status
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        
        return queryset.order_by('-date_joined')
    
    @action(detail=True, methods=['post'])
    def toggle_active(self, request: Request, pk: Any = None) -> Response:
        """Toggle user active status"""
        user = self.get_object()
        
        # Prevent deactivating self
        if user.id == request.user.id:
            return Response(
                {'error': 'You cannot deactivate your own account'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.is_active = not user.is_active
        user.save()
        serializer = self.get_serializer(user)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def toggle_staff(self, request: Request, pk: Any = None) -> Response:
        """Toggle user staff status"""
        user = self.get_object()
        
        # Only superusers can modify staff status
        if not request.user.is_superuser:
            return Response(
                {'error': 'Only superusers can modify staff status'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        user.is_staff = not user.is_staff
        user.save()
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class AdminOrderViewSet(viewsets.ModelViewSet):
    """ViewSet for order management"""
    serializer_class = AdminOrderSerializer
    permission_classes = [IsAdminUser]
    queryset = Order.objects.none()
    
    def get_queryset(self) -> QuerySet[Order]:
        queryset = Order.objects.select_related('user').prefetch_related('items__product').annotate(
            items_count=Count('items')
        )
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by payment status
        payment_status = self.request.query_params.get('payment_status')
        if payment_status:
            queryset = queryset.filter(payment_status=payment_status)
        
        # Search by order number or user email
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(order_number__icontains=search) |
                Q(user__email__icontains=search)
            )
        
        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date:
            queryset = queryset.filter(created_at__gte=start_date)
        if end_date:
            queryset = queryset.filter(created_at__lte=end_date)
        
        return queryset.order_by('-created_at')
    
    @action(detail=True, methods=['post'])
    def update_status(self, request: Request, pk: Any = None) -> Response:
        """Update order status"""
        order = self.get_object()
        new_status = request.data.get('status')
        
        valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
        if new_status not in valid_statuses:
            return Response(
                {'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = new_status
        order.save()
        serializer = self.get_serializer(order)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_payment_status(self, request: Request, pk: Any = None) -> Response:
        """Update payment status"""
        order = self.get_object()
        new_status = request.data.get('payment_status')
        
        valid_statuses = ['pending', 'paid', 'failed', 'refunded']
        if new_status not in valid_statuses:
            return Response(
                {'error': f'Invalid payment status. Must be one of: {", ".join(valid_statuses)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.payment_status = new_status
        order.save()
        serializer = self.get_serializer(order)
        return Response(serializer.data)


class AdminCategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for category management"""
    serializer_class = AdminCategorySerializer
    permission_classes = [IsAdminUser]
    queryset = Category.objects.none()
    
    def get_queryset(self) -> QuerySet[Category]:
        queryset = Category.objects.annotate(
            products_count=Count('products')
        )
        
        # Search by name
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset.order_by('name')
    
    def destroy(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Prevent deletion of categories with products"""
        category = self.get_object()
        
        if category.products.exists():
            return Response(
                {'error': 'Cannot delete category with existing products'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return super().destroy(request, *args, **kwargs)