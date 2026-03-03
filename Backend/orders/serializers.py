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
    coupon_code = serializers.CharField(required=False, allow_blank=True)

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
            "items",
            "coupon_code",
        ]
        
class OrderDetailItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product_name", "price", "qty"]


class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderDetailItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "payment_status",
            "order_status",
            "razorpay_payment_id",
            "created_at",
            "subtotal",
            "shipping",
            "tax",
            "total",
            "items",
        ]