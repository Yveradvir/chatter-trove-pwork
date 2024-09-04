from django.contrib import admin

from .models import User, UserAdditionals

admin.site.register(User)
admin.site.register(UserAdditionals)