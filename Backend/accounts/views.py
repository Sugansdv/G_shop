from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from .serializers import RegisterSerializer, LoginSerializer
from orders.models import Coupon
import random
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Profile
from .serializers import ProfileSerializer

User = get_user_model()


# ================= REGISTER =================

class AuthViewSet(viewsets.ViewSet):

    def create(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            # Generate welcome coupon
            coupon_code = f"WELCOME{random.randint(1000,9999)}"

            Coupon.objects.create(
                code=coupon_code,
                discount_percent=50,
                user=user
            )

            # Create auth token
            token, created = Token.objects.get_or_create(user=user)

            return Response(
                {
                    "message": "User registered successfully",
                    "coupon_code": coupon_code,
                    "token": token.key,
                    "user": {
                        "username": user.username,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email,
                        "phone": user.profile.phone,
                    }
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ================= LOGIN =================

class LoginViewSet(viewsets.ViewSet):

    def create(self, request):

        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():

            username_or_email = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            # Login using email OR username
            user = User.objects.filter(email=username_or_email).first()

            if user:
                username = user.username
            else:
                username = username_or_email

            user = authenticate(
                username=username,
                password=password
            )

            if user:

                token, created = Token.objects.get_or_create(user=user)

                return Response({
                    "message": "Login successful",
                    "token": token.key,
                    "user": {
                        "username": user.username,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email,
                        "phone": user.profile.phone,
                    }
                })

            return Response(
                {"detail": "Invalid username/email or password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    



class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    # ================= GET PROFILE =================

    def get(self, request):

        profile = request.user.profile

        serializer = ProfileSerializer(profile)

        return Response(serializer.data)

    # ================= UPDATE PROFILE =================

    def put(self, request):

        profile = request.user.profile

        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response({
                "message": "Profile updated successfully",
                "data": serializer.data
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from django.contrib.auth.password_validation import validate_password

class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        # Check current password
        if not user.check_password(current_password):
            return Response(
                {"error": "Current password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check new password match
        if new_password != confirm_password:
            return Response(
                {"error": "Passwords do not match"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate password strength
        try:
            validate_password(new_password, user)
        except Exception as e:
            return Response(
                {"error": list(e.messages)},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update password
        user.set_password(new_password)
        user.save()

        # Logout all sessions
        Token.objects.filter(user=user).delete()

        return Response({
            "message": "Password updated successfully. Please login again."
        })