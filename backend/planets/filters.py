from django_filters import rest_framework as filters
from .models import Planet
from django.db.models import Case, When, BooleanField

class PlanetFilter(filters.FilterSet):
    is_private = filters.BooleanFilter(field_name="is_private", method='filter_is_private')

    class Meta:
        model = Planet
        fields = {
            "planetname": ["exact", "istartswith", "icontains"],
            "nickname": ["exact", "istartswith", "icontains"],
            "description": ["exact", "istartswith", "icontains"],
        }
        exclude = ['created_at', 'password']

    def filter_is_private(self, queryset, name, value):
        if value is None:
            return queryset  
        return queryset.annotate(
            is_private=Case(
                When(password__isnull=False, password__gt='', then=True),  
                default=False,
                output_field=BooleanField()
            )
        ).filter(is_private=value)
