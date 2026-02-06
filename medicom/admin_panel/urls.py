from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AdminDashboardViewSet,
    AdminProductViewSet,
    AdminUserViewSet,
    AdminOrderViewSet,
    AdminCategoryViewSet
)

router = DefaultRouter()
router.register(r'dashboard', AdminDashboardViewSet, basename='admin-dashboard')
router.register(r'products', AdminProductViewSet, basename='admin-products')
router.register(r'users', AdminUserViewSet, basename='admin-users')
router.register(r'orders', AdminOrderViewSet, basename='admin-orders')
router.register(r'categories', AdminCategoryViewSet, basename='admin-categories')

urlpatterns = [
    path('', include(router.urls)),
]