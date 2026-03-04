from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    phone = models.CharField(max_length=15)

    gender = models.CharField(
        max_length=10,
        choices=[
            ("male", "Male"),
            ("female", "Female"),
            ("other", "Other"),
        ],
        blank=True,
        null=True
    )

    profile_image = models.ImageField(
        upload_to="profile_images/",
        default="profile_images/default_user.webp",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.user.username