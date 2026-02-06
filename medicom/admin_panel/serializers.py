from rest_framework import serializers
from django.contrib.auth import get_user_model
from products.models import Product, Category
from orders.models import Order, OrderItem

User = get_user_model()


class AdminDashboardStatsSerializer(serializers.Serializer):
    """Serializer for dashboard statistics"""
    total_products = serializers.IntegerField()
    total_orders = serializers.IntegerField()
    total_users = serializers.IntegerField()
    total_revenue = serializers.FloatField()
    low_stock_products = serializers.IntegerField()
    pending_orders = serializers.IntegerField()


class AdminProductSerializer(serializers.ModelSerializer):
    """Serializer for product management"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'image', 
            'stock', 'category', 'category_name', 'is_available',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class AdminUserSerializer(serializers.ModelSerializer):
    """Serializer for user management"""
    total_orders = serializers.IntegerField(read_only=True)
    total_spent = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'phone', 'is_active', 'is_staff', 'is_superuser',
            'date_joined', 'last_login', 'total_orders', 'total_spent'
        ]
        read_only_fields = ['date_joined', 'last_login']


class AdminOrderItemSerializer(serializers.ModelSerializer):
    """Serializer for order items in admin panel"""
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.ImageField(source='product.image', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_image', 'quantity', 'price']


class AdminOrderSerializer(serializers.ModelSerializer):
    """Serializer for order management"""
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_name = serializers.SerializerMethodField()
    items = AdminOrderItemSerializer(many=True, read_only=True)
    items_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'user_email', 'user_name',
            'status', 'payment_method', 'payment_status', 'total_amount',
            'shipping_address', 'shipping_city', 'shipping_state',
            'shipping_pincode', 'shipping_phone', 'items', 'items_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['order_number', 'created_at', 'updated_at']
    
    def get_user_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username


class AdminCategorySerializer(serializers.ModelSerializer):
    """Serializer for category management"""
    products_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image', 'products_count', 'created_at']
        read_only_fields = ['created_at']