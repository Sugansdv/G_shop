from django.contrib import admin
from .models import Product, Category, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]

    list_display = (
        "id",
        "name",
        "category",
        "weight_display",   # ✅ combined weight + unit
        "price",
        "old_price",
        "stock",
        "rating",
    )

    list_filter = (
        "category",
        "weight_unit",      # ✅ filter by unit
    )

    search_fields = (
        "name",
        "brand",
        "sku",
    )

    list_editable = (
        "price",
        "stock",
    )

    readonly_fields = ("sku", "created_at")

    # ✅ show weight nicely
    def weight_display(self, obj):
        return f"{obj.weight} {obj.get_weight_unit_display()}"
    weight_display.short_description = "Weight"