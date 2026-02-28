from rest_framework import viewsets, filters, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, Review, ContactMessage, FAQ
from .serializers import CategorySerializer, ProductSerializer, ReviewSerializer, ContactMessageSerializer, FAQSerializer
from rest_framework.views import APIView
from django.core.mail import send_mail, EmailMultiAlternatives, EmailMessage
from django.conf import settings
from django.utils.html import strip_tags

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


@api_view(['GET'])
@permission_classes([AllowAny])
def check_cloudinary(request):
    import cloudinary
    c = cloudinary.config()
    return Response({
        'cloud_name': c.cloud_name,
        'api_key': c.api_key,
        'has_secret': bool(c.api_secret),
        'default_storage': settings.DEFAULT_FILE_STORAGE,
    })


class ContactMessageView(APIView):
    """
    POST /api/contact/
    Accepts contact form submissions, saves to DB, and sends email notifications.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Save to database
        contact = serializer.save()

        errors = []

        # Send email to admin/support team
        try:
            self._send_admin_notification(contact)
        except Exception as e:
            errors.append(f'Admin email failed: {str(e)}')

        # Send confirmation email to user
        try:
            self._send_user_confirmation(contact)
        except Exception as e:
            errors.append(f'User email failed: {str(e)}')

        return Response(
            {
                'success': True,
                'message': 'Your message has been received. We will get back to you within 24 hours.',
                'email_errors': errors,  # ← remove this line once emails are working
            },
            status=status.HTTP_201_CREATED,
        )

    def _send_admin_notification(self, contact: ContactMessage):
        """Notify the support team about a new contact message."""
        subject = f'[MediCare Support] New Message: {contact.subject}'
        body = (
            f'New contact message received:\n\n'
            f'Name:    {contact.name}\n'
            f'Email:   {contact.email}\n'
            f'Subject: {contact.subject}\n'
            f'Message:\n{contact.message}\n\n'
            f'---\n'
            f'Received at: {contact.created_at.strftime("%d %b %Y, %I:%M %p")}\n'
            f'Reply directly to {contact.email}'
        )
        # Use EmailMessage instead of send_mail so reply_to works correctly
        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.SUPPORT_EMAIL],
            reply_to=[contact.email],
        )
        email.send(fail_silently=False)

    def _send_user_confirmation(self, contact: ContactMessage):
        """Send an acknowledgement email to the user."""
        subject = 'We received your message — MediCare Support'
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; color: #1f2937; padding: 24px;">
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #2563eb, #06b6d4); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">MediCare</h1>
                    <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Your Health, Our Priority</p>
                </div>
                <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                    <h2 style="color: #1f2937; margin-top: 0;">Hi {contact.name},</h2>
                    <p style="color: #4b5563; line-height: 1.6;">
                        Thank you for reaching out to us. We have received your message and our support team will get back to you within <strong>24 hours</strong>.
                    </p>

                    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 24px 0;">
                        <p style="margin: 0 0 8px; font-weight: bold; color: #374151;">Your Message Summary</p>
                        <p style="margin: 4px 0; color: #6b7280;"><strong>Subject:</strong> {contact.subject}</p>
                        <p style="margin: 4px 0; color: #6b7280;"><strong>Message:</strong> {contact.message}</p>
                    </div>

                    <p style="color: #4b5563; line-height: 1.6;">
                        If your query is urgent, you can also reach us at:
                    </p>
                    <ul style="color: #4b5563; line-height: 1.8;">
                        <li>📞 Helpline: <a href="tel:1800-123-4567" style="color: #2563eb;">1800-123-4567</a> (24/7, Toll Free)</li>
                        <li>📧 Email: <a href="mailto:support@medicare.com" style="color: #2563eb;">support@medicare.com</a></li>
                    </ul>

                    <p style="color: #6b7280; font-size: 14px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                        This is an automated acknowledgement. Please do not reply to this email.
                        <br>© {contact.created_at.year} MediCare Pharmacy. All rights reserved.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        plain_body = strip_tags(html_body)

        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[contact.email],
        )
        email.attach_alternative(html_body, 'text/html')
        email.send(fail_silently=False)


class FAQViewSet(viewsets.ModelViewSet):
    """
    GET  /api/faqs/           → list all active FAQs (grouped by category on frontend)
    GET  /api/faqs/?category=orders  → filter by category
    Admin only: POST / PUT / PATCH / DELETE
    """
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = FAQ.objects.filter(is_active=True)
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_available']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'name']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def add_review(self, request, slug=None):
        product = self.get_object()
        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():
            if Review.objects.filter(product=product, user=request.user).exists():
                return Response(
                    {'error': 'You have already reviewed this product'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer.save(user=request.user, product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def reviews(self, request, slug=None):
        product = self.get_object()
        reviews = product.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)