from urllib import request

import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Address, Order, OrderItem, PaymentCard
from .serializers import CreateOrderSerializer



# ================= CREATE ORDER =================
from .models import Coupon
class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CreateOrderSerializer(data=request.data)

        if serializer.is_valid():

            items = serializer.validated_data["items"]
            coupon_code = serializer.validated_data.get("coupon_code")

            # 🔢 CALCULATE SUBTOTAL
            subtotal = 0
            for item in items:
                subtotal += float(item["price"]) * int(item["qty"])

            # 🚚 SHIPPING
            shipping = 0 if subtotal >= 500 else 20
            tax = 0

            total = subtotal + shipping + tax

            # 🎁 APPLY COUPON
            if coupon_code:
                try:
                    coupon = Coupon.objects.get(
                        code__iexact=coupon_code,
                        user=request.user,
                        is_used=False
                    )

                    discount = (subtotal * coupon.discount_percent) / 100
                    total -= discount

                    coupon.is_used = True
                    coupon.save()

                except Coupon.DoesNotExist:
                    return Response(
                        {"error": "Invalid coupon"},
                        status=400
                    )

            # 📝 CREATE ORDER
            order = Order.objects.create(
                user=request.user,
                first_name=serializer.validated_data["first_name"],
                last_name=serializer.validated_data["last_name"],
                company=serializer.validated_data.get("company"),
                country=serializer.validated_data["country"],
                street_address=serializer.validated_data["street_address"],
                city=serializer.validated_data["city"],
                state=serializer.validated_data["state"],
                zip_code=serializer.validated_data["zip_code"],
                phone=serializer.validated_data["phone"],
                email=serializer.validated_data["email"],
                subtotal=subtotal,
                shipping=shipping,
                tax=tax,
                total=total,
            )

            # 🛒 SAVE ITEMS
            for item in items:
                OrderItem.objects.create(
                    order=order,
                    product_name=item["product_name"],
                    price=item["price"],
                    qty=item["qty"],
                )

            return Response({
                "order_id": order.id,
                "final_total": order.total
            })

        return Response(serializer.errors, status=400)

# ================= CREATE PAYMENT =================



class CreatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        order_id = request.data.get("order_id")

        try:
            order = Order.objects.get(
                id=order_id,
                user=request.user
            )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            client = razorpay.Client(
                auth=(
                    settings.RAZORPAY_KEY_ID,
                    settings.RAZORPAY_SECRET_KEY,
                )
            )

            payment = client.order.create({
                "amount": int(float(order.total) * 100),
                "currency": "INR",
                "payment_capture": 1,
            })

            order.razorpay_order_id = payment["id"]
            order.payment_status = "pending"
            order.save()

            return Response({
                "key": settings.RAZORPAY_KEY_ID,
                "razorpay_order_id": payment["id"],
                "amount": payment["amount"],
                "currency": payment["currency"],
            })

        except Exception as e:
            print("RAZORPAY ERROR:", str(e))

            return Response(
                {"error": "Payment creation failed"},
                status=400
            )
            


class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data

        razorpay_order_id = data.get("razorpay_order_id")
        razorpay_payment_id = data.get("razorpay_payment_id")
        razorpay_signature = data.get("razorpay_signature")

        try:
            order = Order.objects.get(
                razorpay_order_id=razorpay_order_id,
                user=request.user
            )
        except Order.DoesNotExist:
             return Response({"error": "Order not found"}, status=404)

        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID,
                  settings.RAZORPAY_SECRET_KEY)
        )

        try:
            client.utility.verify_payment_signature({
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": razorpay_payment_id,
                "razorpay_signature": razorpay_signature,
            })

            order.payment_status = "paid"
            order.order_status = "accepted"
            order.razorpay_payment_id = razorpay_payment_id
            order.razorpay_signature = razorpay_signature
            order.save()

            return Response({"message": "Payment verified"})

        except Exception:
            order.payment_status = "failed"
            order.save()

            return Response({"error": "Payment verification failed"}, status=400)
        
        
from .serializers import OrderDetailSerializer

class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            order = Order.objects.get(id=pk, user=request.user)
        except Order.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)
    
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from django.http import HttpResponse
import io


class DownloadInvoiceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            order = Order.objects.get(id=pk, user=request.user)
        except Order.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer)
        elements = []

        styles = getSampleStyleSheet()

        elements.append(Paragraph("INVOICE", styles["Heading1"]))
        elements.append(Spacer(1, 0.5 * inch))

        elements.append(Paragraph(f"Order ID: {order.id}", styles["Normal"]))
        elements.append(Paragraph(f"Transaction ID: {order.razorpay_payment_id}", styles["Normal"]))
        elements.append(Spacer(1, 0.3 * inch))

        data = [["Product", "Qty", "Price"]]

        for item in order.items.all():
            data.append([
                item.product_name,
                str(item.qty),
                f"₹ {item.price * item.qty}"
            ])

        data.append(["", "", ""])
        data.append(["Total", "", f"₹ {order.total}"])

        table = Table(data, colWidths=[3 * inch, 1 * inch, 1.5 * inch])

        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))

        elements.append(table)

        doc.build(elements)

        buffer.seek(0)

        response = HttpResponse(buffer, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="invoice_{order.id}.pdf"'

        return response

from orders.models import Coupon 
    
class ApplyCouponView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        code = request.data.get("code", "").strip().upper()

        print("Entered Code:", code)
        print("Logged In User:", request.user)

        try:
            coupon = Coupon.objects.get(
                code__iexact=code,
                user=request.user,
                is_used=False
            )
        except Coupon.DoesNotExist:
            return Response(
                {"error": "Invalid or already used coupon"},
                status=400
            )

        return Response({
            "discount_percent": coupon.discount_percent
        })
        

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order


@api_view(["POST"])
def track_order(request):
    order_id = request.data.get("order_id")
    email = request.data.get("email")

    if not order_id or not email:
        return Response(
            {"error": "Order ID and Email are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        order = Order.objects.get(id=order_id, email=email)
    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    status_map = {
        "placed": 0,
        "accepted": 1,
        "progress": 2,
        "ontheway": 3,
        "delivered": 4,
    }

    return Response({
        "id": order.id,
        "order_status": order.order_status,   # ⭐ IMPORTANT
        "current_step": status_map.get(order.order_status, 0),
        "items": [
            {
                "product_name": item.product_name,
                "price": item.price,
                "qty": item.qty,
            }
            for item in order.items.all()
        ]
    })

class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")

        serializer = OrderDetailSerializer(orders, many=True)

        return Response(serializer.data)
    
    
# views.py

class CancelOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        try:
            order = Order.objects.get(id=pk, user=request.user)

            if order.order_status not in ["placed", "accepted"]:
                return Response(
                    {"error": "Order cannot be cancelled"},
                    status=400
                )

            order.order_status = "cancelled"
            order.save()

            return Response({"message": "Order cancelled"})

        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)

class RequestCancelOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        try:
            order = Order.objects.get(id=pk, user=request.user)

            if order.order_status in ["delivered", "cancelled"]:
                return Response(
                    {"error": "Order cannot be cancelled"},
                    status=400
                )

            order.cancel_status = "requested"
            order.save()

            return Response({
                "message": "Cancel request sent to admin"
            })

        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found"},
                status=404
            )
            
from .models import Review


class CreateReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        product_name = request.data.get("product_name")
        rating = request.data.get("rating")
        comment = request.data.get("comment")
        
        if Review.objects.filter(
            user=request.user,
            product_name=product_name
        ).exists():
            return Response(
                {"error": "You have already reviewed this product"},
                status=400
            )

        Review.objects.create(
            user=request.user,
            product_name=product_name,
            rating=rating,
            comment=comment
        )

        return Response({"message": "Review added"})
    
    
    
            
from .models import Address    
class AddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        addresses = Address.objects.filter(user=request.user)

        data = [
            {
                "id": a.id,
                "first_name": a.first_name,
                "last_name": a.last_name,
                "company": a.company,
                "country": a.country,
                "street_address": a.street_address,
                "city": a.city,
                "state": a.state,
                "zip_code": a.zip_code,
                "phone": a.phone,
                "email": a.email,
            }
            for a in addresses
        ]

        return Response(data)

    def post(self, request):

        Address.objects.create(
            user=request.user,
            first_name=request.data.get("first_name"),
            last_name=request.data.get("last_name"),
            company=request.data.get("company"),
            country=request.data.get("country"),
            street_address=request.data.get("street_address"),
            city=request.data.get("city"),
            state=request.data.get("state"),
            zip_code=request.data.get("zip_code"),
            phone=request.data.get("phone"),
            email=request.data.get("email"),
        )

        return Response({"message": "Address saved"})
    
    
class DeleteAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        try:
            address = Address.objects.get(id=pk, user=request.user)
            address.delete()
            return Response({"message": "Address deleted"})
        except Address.DoesNotExist:
            return Response({"error": "Not found"}, status=404)
        
class UpdateAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:
            address = Address.objects.get(id=pk, user=request.user)

            for field in request.data:
                setattr(address, field, request.data[field])

            address.save()

            return Response({"message": "Address updated"})

        except Address.DoesNotExist:
            return Response({"error": "Not found"}, status=404)
        
class SaveCardView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        card_holder = request.data.get("card_holder")
        card_number = request.data.get("card_number")
        expiry_month = request.data.get("expiry_month")
        expiry_year = request.data.get("expiry_year")

        card = PaymentCard.objects.create(
            user=request.user,
            card_holder=card_holder,
            card_number=card_number,
            expiry_month=expiry_month,
            expiry_year=expiry_year,
        )

        return Response({
            "message": "Card saved"
        })
        
        
class MyCardsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        cards = PaymentCard.objects.filter(user=request.user)

        data = []

        for card in cards:
            data.append({
                "id": card.id,
                "card_holder": card.card_holder,
                "card_number": card.masked_number(),
                "expiry_month": card.expiry_month,
                "expiry_year": card.expiry_year,
            })

        return Response(data)