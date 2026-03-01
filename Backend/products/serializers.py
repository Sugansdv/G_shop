from rest_framework import serializers
from .models import Product, Category, ProductImage


# ================= CATEGORY =================
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# ================= PRODUCT IMAGE =================
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image"]


# ================= PRODUCT =================
class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    images = ProductImageSerializer(
        many=True,
        read_only=True
    )

    # ✅ use property directly
    offer_percent = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "brand",
            "description",
            "sku",
            "tags",
            "category",
            "category_name",
            "weight",
            "weight_unit",
            "price",
            "old_price",
            "offer_percent",
            "stock",
            "rating",
            "image",
            "images",
            "created_at",
        ]