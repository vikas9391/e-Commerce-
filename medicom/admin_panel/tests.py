from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from products.models import Product, Category
from orders.models import Order

User = get_user_model()


class AdminPanelTestCase(TestCase):
    """Test cases for admin panel"""
    
    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        
        # Create superuser
        self.admin_user = User.objects.create_superuser(
            email='admin@test.com',
            username='admin',
            password='testpass123'
        )
        
        # Create regular user
        self.regular_user = User.objects.create_user(
            email='user@test.com',
            username='user',
            password='testpass123'
        )
        
        # Create category
        self.category = Category.objects.create(
            name='Test Category',
            description='Test description'
        )
        
        # Create product
        self.product = Product.objects.create(
            name='Test Product',
            description='Test description',
            price=100.00,
            stock=50,
            category=self.category,
            is_available=True
        )
    
    def test_dashboard_stats_unauthorized(self):
        """Test dashboard stats without authentication"""
        response = self.client.get('/api/admin-panel/dashboard/stats/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_dashboard_stats_regular_user(self):
        """Test dashboard stats with regular user"""
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get('/api/admin-panel/dashboard/stats/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_dashboard_stats_admin(self):
        """Test dashboard stats with admin user"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/admin-panel/dashboard/stats/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_products', response.data)
        self.assertIn('total_orders', response.data)
        self.assertIn('total_users', response.data)
    
    def test_get_products(self):
        """Test getting products list"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/admin-panel/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_create_product(self):
        """Test creating a product"""
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'name': 'New Product',
            'description': 'New description',
            'price': 150.00,
            'stock': 30,
            'category': self.category.id,
            'is_available': True
        }
        response = self.client.post('/api/admin-panel/products/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)
    
    def test_update_product(self):
        """Test updating a product"""
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'name': 'Updated Product',
            'description': 'Updated description',
            'price': 120.00,
            'stock': 40,
            'category': self.category.id,
            'is_available': True
        }
        response = self.client.put(
            f'/api/admin-panel/products/{self.product.id}/',
            data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.name, 'Updated Product')
    
    def test_delete_product(self):
        """Test deleting a product"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(f'/api/admin-panel/products/{self.product.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)
    
    def test_toggle_product_availability(self):
        """Test toggling product availability"""
        self.client.force_authenticate(user=self.admin_user)
        initial_status = self.product.is_available
        response = self.client.post(
            f'/api/admin-panel/products/{self.product.id}/toggle_availability/'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.is_available, not initial_status)
    
    def test_update_product_stock(self):
        """Test updating product stock"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(
            f'/api/admin-panel/products/{self.product.id}/update_stock/',
            {'stock': 100}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 100)
    
    def test_filter_low_stock_products(self):
        """Test filtering low stock products"""
        # Create low stock product
        Product.objects.create(
            name='Low Stock Product',
            description='Test',
            price=50.00,
            stock=5,
            category=self.category,
            is_available=True
        )
        
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/admin-panel/products/?filter=low-stock')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_search_products(self):
        """Test searching products"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/admin-panel/products/?search=Test')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data['results']), 0)
    
    def test_get_users(self):
        """Test getting users list"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/admin-panel/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should have admin and regular user
        self.assertEqual(len(response.data['results']), 2)
    
    def test_toggle_user_active(self):
        """Test toggling user active status"""
        self.client.force_authenticate(user=self.admin_user)
        initial_status = self.regular_user.is_active
        response = self.client.post(
            f'/api/admin-panel/users/{self.regular_user.id}/toggle_active/'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.regular_user.refresh_from_db()
        self.assertEqual(self.regular_user.is_active, not initial_status)
    
    def test_cannot_deactivate_self(self):
        """Test that admin cannot deactivate their own account"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(
            f'/api/admin-panel/users/{self.admin_user.id}/toggle_active/'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)