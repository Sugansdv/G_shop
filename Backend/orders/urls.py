from django.urls import path
from .views import CreateOrderView, CreatePaymentView, VerifyPaymentView

urlpatterns = [
    path("create/", CreateOrderView.as_view()),
    path("payment/", CreatePaymentView.as_view()),
    path("verify-payment/", VerifyPaymentView.as_view()),
]