import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Order, OrderItem
from .serializers import CreateOrderSerializer



# ================= CREATE ORDER =================

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CreateOrderSerializer(data=request.data)

        # ✅ VALID DATA
        if serializer.is_valid():

            print("VALIDATED DATA:", serializer.validated_data)

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
                subtotal=serializer.validated_data["subtotal"],
                shipping=serializer.validated_data["shipping"],
                tax=serializer.validated_data["tax"],
                total=serializer.validated_data["total"],
            )

            # ✅ SAVE ORDER ITEMS
            for item in serializer.validated_data["items"]:
                OrderItem.objects.create(
                    order=order,
                    product_name=item["product_name"],
                    price=item["price"],
                    qty=item["qty"],
                )

            return Response({
                "message": "Address saved",
                "order_id": order.id
            })

        # ✅ INVALID DATA (THIS IS THE ELSE PART)
        else:
            print("SERIALIZER ERRORS:", serializer.errors)

            return Response(
                serializer.errors,
                status=400
            )

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

        order = Order.objects.get(
            razorpay_order_id=razorpay_order_id,
            user=request.user
        )

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