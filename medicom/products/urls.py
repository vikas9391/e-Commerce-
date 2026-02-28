from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet,ContactMessageView, FAQViewSet


router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'', ProductViewSet, basename='product')
router.register(r'faqs', FAQViewSet, basename='faq')

urlpatterns = [
    path('contact/', ContactMessageView.as_view(), name='contact'),
    path('', include(router.urls)),
]
