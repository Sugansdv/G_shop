from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, LoginViewSet

router = DefaultRouter()

router.register("register", AuthViewSet, basename="register")
router.register("login", LoginViewSet, basename="login")

urlpatterns = router.urls