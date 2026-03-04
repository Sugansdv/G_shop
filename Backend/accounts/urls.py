from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import AuthViewSet, LoginViewSet, ProfileView

router = DefaultRouter()

router.register("register", AuthViewSet, basename="register")
router.register("login", LoginViewSet, basename="login")

urlpatterns = router.urls

# Profile API
urlpatterns += [
    path("profile/", ProfileView.as_view(), name="profile"),
]