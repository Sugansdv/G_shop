from django.urls import path
from .views import AddressView, ApplyCouponView, CreateOrderView, CreatePaymentView, CreateReviewView, DeleteAddressView, DownloadInvoiceView, UpdateAddressView
from .views import OrderDetailView, VerifyPaymentView, track_order, MyOrdersView,CancelOrderView, RequestCancelOrder
from .views import SaveCardView, MyCardsView
urlpatterns = [
    path("create/", CreateOrderView.as_view()),
    path("payment/", CreatePaymentView.as_view()),
    path("verify-payment/", VerifyPaymentView.as_view()),
    path("<int:pk>/", OrderDetailView.as_view()), 
    path("<int:pk>/invoice/", DownloadInvoiceView.as_view()),
    path("apply-coupon/", ApplyCouponView.as_view()),
    path("track/", track_order, name="track-order"),
    path("my-orders/", MyOrdersView.as_view()),
    path("<int:pk>/cancel/", CancelOrderView.as_view()),
    path("<int:pk>/request-cancel/", RequestCancelOrder.as_view()),
    path("add-review/", CreateReviewView.as_view()),
    path("addresses/", AddressView.as_view()),
    path("addresses/<int:pk>/delete/", DeleteAddressView.as_view()),    
    path("addresses/<int:pk>/update/", UpdateAddressView.as_view()),
    path("cards/", MyCardsView.as_view()),
    path("cards/add/", SaveCardView.as_view()),
    
]