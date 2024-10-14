from django_filters import rest_framework as filters

from .models import Comet

class CometsFilter(filters.FilterSet):
    class Meta:
        model = Comet
        fields = {
            "id": ["exact"],
            "user": ["exact"],
            "planet": ["exact"],
            
            "title": ["exact", "istartswith", "icontains"],
        }