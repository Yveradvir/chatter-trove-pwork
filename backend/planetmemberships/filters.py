from django_filters import rest_framework as filters
from .models import PlanetMembership

class PlanetMembershipsFilter(filters.FilterSet):    
    class Meta:
        model = PlanetMembership
        fields = '__all__'
        excludes = ["created_at"]