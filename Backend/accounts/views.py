from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import RegisterSerializer
from django.contrib.auth import authenticate, get_user_model
from .serializers import LoginSerializer


class AuthViewSet(viewsets.ViewSet):

    def create(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=400)

from rest_framework.authtoken.models import Token

User = get_user_model()


class LoginViewSet(viewsets.ViewSet):

    def create(self, request):

        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():

            username_or_email = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            # ✅ login using email or username
            user = User.objects.filter(
                email=username_or_email
            ).first()

            if user:
                username = user.username
            else:
                username = username_or_email

            user = authenticate(
                username=username,
                password=password
            )

            if user:

                # ✅ CREATE TOKEN
                token, created = Token.objects.get_or_create(user=user)

                return Response({
                    "message": "Login successful",
                    "token": token.key,   # ⭐ IMPORTANT
                    "user": {
                        "username": user.username,
                        "email": user.email,
                    }
                })

            return Response(
                {"detail": "Invalid username/email or password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.errors, status=400)