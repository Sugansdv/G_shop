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
        name = validated_data.pop("username")

        name_parts = name.split(" ", 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""

        user = User.objects.create_user(
            username=name,
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=first_name,
            last_name=last_name,
        )

        Profile.objects.create(
            user=user,
            phone=phone
        )

        return user
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    
# class ProfileSerializer(serializers.ModelSerializer):

#     first_name = serializers.CharField(source="user.first_name", required=False)
#     last_name = serializers.CharField(source="user.last_name", required=False)
#     email = serializers.EmailField(source="user.email", required=False)

#     class Meta:
#         model = Profile
#         fields = [
#             "first_name",
#             "last_name",
#             "email",
#             "phone",
#             "gender",
#             "profile_image",
#         ]

#     def update(self, instance, validated_data):

#         user_data = validated_data.pop("user", {})

#         user = instance.user

#         user.first_name = user_data.get("first_name", user.first_name)
#         user.last_name = user_data.get("last_name", user.last_name)
#         user.email = user_data.get("email", user.email)

#         user.save()

#         instance.phone = validated_data.get("phone", instance.phone)
#         instance.gender = validated_data.get("gender", instance.gender)

#         if validated_data.get("profile_image"):
#             instance.profile_image = validated_data["profile_image"]

#         instance.save()

#         return instance


class ProfileSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(source="user.first_name", required=False)
    last_name = serializers.CharField(source="user.last_name", required=False)
    email = serializers.EmailField(source="user.email", required=False)

    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "gender",
            "profile_image",
        ]

    def update(self, instance, validated_data):

        user_data = validated_data.pop("user", None)

        if user_data:
            user = instance.user

            user.first_name = user_data.get("first_name", user.first_name)
            user.last_name = user_data.get("last_name", user.last_name)
            user.email = user_data.get("email", user.email)

            user.save()

        instance.phone = validated_data.get("phone", instance.phone)
        instance.gender = validated_data.get("gender", instance.gender)

        if validated_data.get("profile_image"):
            instance.profile_image = validated_data["profile_image"]

        instance.save()

        return instance