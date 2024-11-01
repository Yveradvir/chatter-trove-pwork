from django_filters import rest_framework as filters
from .models import Asteroid

class AsteroidFilter(filters.FilterSet):    
    class Meta:
        model = Asteroid
        fields = {
            "user": ["exact"]
        }
        excludes = ["created_at"]