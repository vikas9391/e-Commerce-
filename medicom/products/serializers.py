from rest_framework import serializers
from .models import Category, Product, Review
from rest_framework import serializers
from .models import ContactMessage, FAQ


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ('id', 'name', 'email', 'subject', 'message', 'created_at')
        read_only_fields = ('id', 'created_at')

    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError('Please provide a valid email address.')
        return value

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError('Message must be at least 10 characters long.')
        return value


class FAQSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = FAQ
        fields = ('id', 'category', 'category_display', 'question', 'answer', 'order', 'is_active')
        read_only_fields = ('id',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Review
        fields = ('id', 'user', 'rating', 'comment', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ('id', 'category', 'category_id', 'name', 'slug', 'description', 
                  'price', 'stock', 'image', 'is_available', 'created_at', 
                  'updated_at', 'reviews', 'average_rating')
        read_only_fields = ('id', 'created_at', 'updated_at')
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum([review.rating for review in reviews]) / len(reviews)
        return 0