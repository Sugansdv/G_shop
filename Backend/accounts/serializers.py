from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class RegisterSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "phone"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        phone = validated_data.pop("phone")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        #create profile 
        Profile.objects.update_or_create(
            user=user,
            defaults={"phone": phone},
        )

        return user
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)