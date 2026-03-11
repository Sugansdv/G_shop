from django.db import models
from django.contrib.auth.models import User


class Order(models.Model):

    ORDER_STATUS = [
        ("placed", "Order Placed"),
        ("accepted", "Accepted"),
        ("progress", "In Progress"),
        ("ontheway", "On The Way"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
    ]

    PAYMENT_STATUS = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
    ]

    CANCEL_STATUS = [
        ("none", "No Request"),
        ("requested", "Cancel Requested"),
        ("approved", "Cancel Approved"),
        ("rejected", "Cancel Rejected"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    cancel_status = models.CharField(
        max_length=20,
        choices=CANCEL_STATUS,
        default="none"
    )

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company = models.CharField(max_length=200, blank=True)

    country = models.CharField(max_length=100)
    street_address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)

    phone = models.CharField(max_length=15)
    email = models.EmailField()

    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    razorpay_order_id = models.CharField(max_length=255, blank=True, null=True)
    razorpay_payment_id = models.CharField(max_length=255, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=255, blank=True, null=True)

    order_status = models.CharField(
        max_length=20,
        choices=ORDER_STATUS,
        default="placed",
        db_index=True
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default="pending",
        db_index=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def status_step(self):
        status_map = {
            "placed": 0,
            "accepted": 1,
            "progress": 2,
            "ontheway": 3,
            "delivered": 4,
        }
        return status_map.get(self.order_status, 0)

    def __str__(self):
        return f"Order #{self.id}"


class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )

    product_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    qty = models.IntegerField()

    def __str__(self):
        return self.product_name


class Coupon(models.Model):

    code = models.CharField(max_length=50, unique=True)
    discount_percent = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Review(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)

    rating = models.IntegerField()
    comment = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    
    
class Address(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company = models.CharField(max_length=200, blank=True)

    country = models.CharField(max_length=100)
    street_address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)

    phone = models.CharField(max_length=15)
    email = models.EmailField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} - {self.street_address}"
    
class PaymentCard(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    card_holder = models.CharField(max_length=200)
    card_number = models.CharField(max_length=20)

    expiry_month = models.IntegerField()
    expiry_year = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def masked_number(self):
        return "**** **** **** " + self.card_number[-4:]

    def __str__(self):
        return f"{self.user.username} - {self.masked_number()}"    
    
