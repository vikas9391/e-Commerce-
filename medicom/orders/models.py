from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product
import uuid

User = get_user_model()

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_number = models.CharField(max_length=100, unique=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Shipping information
    shipping_address = models.TextField()
    shipping_city = models.CharField(max_length=100)
    shipping_state = models.CharField(max_length=100, blank=True)
    shipping_country = models.CharField(max_length=100)
    shipping_postal_code = models.CharField(max_length=20)
    shipping_pincode = models.CharField(max_length=20, blank=True)
    shipping_phone = models.CharField(max_length=15, blank=True)
    phone = models.CharField(max_length=15)
    
    # Payment information
    payment_method = models.CharField(max_length=50, default='card')
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    
    # Tracking
    tracking_number = models.CharField(max_length=100, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.order_number:
            # Generate order number: ORD-YYYYMMDD-XXXX
            from django.utils import timezone
            date_str = timezone.now().strftime('%Y%m%d')
            unique_id = str(uuid.uuid4().hex[:8].upper())
            self.order_number = f'ORD-{date_str}-{unique_id}'
        
        # Sync payment_status with is_paid
        if self.is_paid and self.payment_status == 'pending':
            self.payment_status = 'paid'
        elif self.payment_status == 'paid' and not self.is_paid:
            self.is_paid = True
            
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'Order {self.order_number} by {self.user.email}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f'{self.quantity} x {self.product.name}'
    
    def get_subtotal(self):
        return self.quantity * self.price

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Cart for {self.user.email}'
    
    def get_total(self):
        return sum([item.get_subtotal() for item in self.items.all()])

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    
    class Meta:
        unique_together = ('cart', 'product')
    
    def __str__(self):
        return f'{self.quantity} x {self.product.name}'
    
    def get_subtotal(self):
        return self.quantity * self.product.price