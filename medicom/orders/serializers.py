from rest_framework import serializers
from .models import Order, OrderItem, Cart, CartItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'quantity', 'price', 'subtotal')
    
    def get_subtotal(self, obj):
        return obj.get_subtotal()

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Order
        fields = ('id', 'user', 'status', 'total_amount', 'shipping_address', 
                  'shipping_city', 'shipping_country', 'shipping_postal_code', 
                  'phone', 'payment_method', 'is_paid', 'paid_at', 
                  'tracking_number', 'created_at', 'updated_at', 'items')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at', 'paid_at')

class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('shipping_address', 'shipping_city', 'shipping_country', 
                  'shipping_postal_code', 'phone', 'payment_method')

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    subtotal = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ('id', 'product', 'product_id', 'quantity', 'subtotal')
        read_only_fields = ('id',)
    
    def get_subtotal(self, obj):
        return obj.get_subtotal()

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ('id', 'items', 'total', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')
    
    def get_total(self, obj):
        return obj.get_total()