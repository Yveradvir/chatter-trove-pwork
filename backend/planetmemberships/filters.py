from django_filters import rest_framework as filters
from .models import PlanetMembership

class PlanetMembershipsFilter(filters.FilterSet):    
    username = filters.CharFilter(field_name="user__username", lookup_expr="exact")
    username__istartswith = filters.CharFilter(field_name="user__username", lookup_expr="istartswith")
    username__icontains = filters.CharFilter(field_name="user__username", lookup_expr="icontains")
    
    nickname = filters.CharFilter(field_name="user__nickname", lookup_expr="exact")
    nickname__istartswith = filters.CharFilter(field_name="user__nickname", lookup_expr="istartswith")
    nickname__icontains = filters.CharFilter(field_name="user__nickname", lookup_expr="icontains")
    
    is_active = filters.BooleanFilter(field_name="user__is_active")
    
    class Meta:
        model = PlanetMembership
        fields = '__all__'
        excludes = ["created_at"]