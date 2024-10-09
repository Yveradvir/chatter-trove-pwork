from django_filters import rest_framework as filters

from .models import User

class AccountsFilter(filters.FilterSet):
    class Meta:
        model = User
        fields = {
            "id": ["exact"],
            "username": ["exact", "istartswith"],
            "nickname": ["exact", "istartswith"],
            "is_active": ["exact"]
        }