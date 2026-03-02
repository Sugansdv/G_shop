from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from .filters import ProductFilter


# ================= CATEGORY =================
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("id")
    serializer_class = CategorySerializer

# ================= PRODUCT =================
class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.select_related("category").prefetch_related("images")
    serializer_class = ProductSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,      # ✅ add search
        filters.OrderingFilter,
    ]

    filterset_class = ProductFilter

    search_fields = [
        "name",
        "brand",
        "tags",
    ]

    ordering_fields = [
        "price",
        "rating",
        "created_at",
    ]

    ordering = ["display_order", "-created_at"] 