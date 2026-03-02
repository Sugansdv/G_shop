from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import Profile


# -------- Profile Inline --------
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False


# -------- Extend User Admin --------
class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)
    list_display = ("username", "email", "get_phone", "is_staff")

    def get_phone(self, obj):
        return obj.profile.phone

    get_phone.short_description = "Phone"


# unregister default
admin.site.unregister(User)

# register updated admin
admin.site.register(User, UserAdmin)