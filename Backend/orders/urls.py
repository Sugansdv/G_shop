from django.urls import path
from .views import ApplyCouponView, CreateOrderView, CreatePaymentView, DownloadInvoiceView, OrderDetailView, VerifyPaymentView, track_order

urlpatterns = [
    path("create/", CreateOrderView.as_view()),
    path("payment/", CreatePaymentView.as_view()),
    path("verify-payment/", VerifyPaymentView.as_view()),
    path("<int:pk>/", OrderDetailView.as_view()), 
    path("<int:pk>/invoice/", DownloadInvoiceView.as_view()),
    path("apply-coupon/", ApplyCouponView.as_view()),
    path("track/", track_order, name="track-order"),
]