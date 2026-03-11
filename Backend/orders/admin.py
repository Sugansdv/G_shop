from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "total",
        "order_status",
        "cancel_status",
        "payment_status",
        "created_at",
    )

    list_filter = (
        "order_status",
        "cancel_status",
        "payment_status",
    )

    search_fields = (
        "id",
        "user__username",
        "email",
        "phone",
    )

    inlines = [OrderItemInline]

    actions = ["approve_cancel"]

    def approve_cancel(self, request, queryset):

        updated = 0

        for order in queryset:
            if order.cancel_status == "requested":
                order.order_status = "cancelled"
                order.cancel_status = "approved"
                order.save()
                updated += 1

        self.message_user(
            request,
            f"{updated} cancel request(s) approved."
        )

    approve_cancel.short_description = "Approve Cancel Request"
    
from .models import PaymentCard

@admin.register(PaymentCard)
class PaymentCardAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "card_holder",
        "card_number",
        "expiry_month",
        "expiry_year",
    )