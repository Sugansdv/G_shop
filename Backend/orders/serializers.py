from rest_framework import serializers
from .models import Order, OrderItem


# ================= ORDER ITEM =================
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product_name", "price", "qty"]


# ================= CREATE ORDER =================

class CreateOrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "first_name",
            "last_name",
            "company",
            "country",
            "street_address",
            "city",
            "state",
            "zip_code",
            "phone",
            "email",
            "subtotal",
            "shipping",
            "tax",
            "total",
            "items",
        ]