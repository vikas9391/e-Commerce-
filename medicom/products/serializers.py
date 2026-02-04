from rest_framework import serializers
from .models import Category, Product, Review

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