from django_filters import rest_framework as filters
from .models import Planet

class PlanetFilter(filters.FilterSet):    
    class Meta:
        model = Planet
        fields = '__all__'
        excludes = ["created_at"]