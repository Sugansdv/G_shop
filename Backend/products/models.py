from django.db import models
import uuid
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=150, unique=True)
    
    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class Product(models.Model):

    WEIGHT_UNIT_CHOICES = [
        ("kg", "Kilogram"),
        ("g", "Gram"),
        ("lb", "Pound"),
        ("oz", "Ounce"),
        ("ml", "Milliliter"),
        ("l", "Liter"),
    ]

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)

    description = models.TextField(blank=True)
    sku = models.CharField(
        max_length=50,
        default=uuid.uuid4,
        editable=False
    )

    tags = models.CharField(
        max_length=200,
        blank=True,
        help_text="comma separated tags"
    )

    weight = models.DecimalField(max_digits=6, decimal_places=2)

    # ✅ dropdown field
    weight_unit = models.CharField(
        max_length=10,
        choices=WEIGHT_UNIT_CHOICES,
        default="kg"
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    stock = models.PositiveIntegerField(default=0)
    rating = models.FloatField(default=0)

    image = models.ImageField(upload_to="products/")
    created_at = models.DateTimeField(auto_now_add=True)
# ================= VARIANT IMAGES =================

class ProductImage(models.Model):

    product = models.ForeignKey(
        "Product",
        related_name="images",  
        on_delete=models.CASCADE
    )

    image = models.ImageField(upload_to="product_variants/")

    is_thumbnail = models.BooleanField(
        default=False,
        help_text="Main thumbnail image"
    )

    def __str__(self):
        return f"{self.product.name} Image"