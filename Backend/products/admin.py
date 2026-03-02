from django.contrib import admin
from .models import Product, Category, ProductImage


# ================= PRODUCT IMAGES INLINE =================
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3
    fields = ("image", "is_thumbnail")


# ================= CATEGORY ADMIN =================
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


# ================= PRODUCT ADMIN =================
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    ordering = ("display_order",)

    inlines = [ProductImageInline]

    list_display = (
        "id",
        "name",
        "category",
        "weight_display",
        "display_order",
        "price",
        "old_price",
        "offer_percent_display",   
        "stock",
        "rating",
    )

    list_filter = (
        "category",
        "weight_unit",
    )

    search_fields = (
        "name",
        "brand",
        "sku",
    )

    list_editable = (
        "display_order",
        "price",
        "stock",
    )

    readonly_fields = (
        "sku",
        "created_at",
        "offer_percent_display",
    )

    # ================= ADMIN SECTIONS =================
    fieldsets = (
        ("Basic Info", {
            "fields": (
                "category",
                "name",
                "brand",
                "description",
                "image",
                "display_order",
            )
        }),

        ("Weight", {
            "fields": ("weight", "weight_unit")
        }),

        ("Pricing", {
            "fields": ("price", "old_price", "offer_percent_display")
        }),

        ("Inventory", {
            "fields": ("stock", "rating")
        }),

        ("System Info", {
            "fields": ("sku", "created_at"),
        }),
    )

    # ================= CUSTOM DISPLAY =================
    def weight_display(self, obj):
        return f"{obj.weight} {obj.get_weight_unit_display()}"
    weight_display.short_description = "Weight"

    def offer_percent_display(self, obj):
        return f"{obj.offer_percent}%"
    offer_percent_display.short_description = "Offer"