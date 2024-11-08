from django_filters import rest_framework as filters
from django.db.models import Case, When, BooleanField, Count
from .models import Planet


class PlanetFilter(filters.FilterSet):
    is_private = filters.BooleanFilter(field_name="is_private", method="filter_is_private")
    popularity = filters.NumberFilter(field_name="popularity", method="filter_popularity")

    class Meta:
        model = Planet
        fields = {
            "planetname": ["exact", "istartswith", "icontains"],
            "nickname": ["exact", "istartswith", "icontains"],
            "description": ["exact", "istartswith", "icontains"],
        }

    def filter_is_private(self, queryset, name, value):
        queryset = queryset.annotate(
            is_private=Case(
                When(password__isnull=False, password__gt="", then=True),
                default=False,
                output_field=BooleanField()
            )
        )
        if value is not None:
            queryset = queryset.filter(is_private=value)
        return queryset

    def filter_popularity(self, queryset, name, value):
        queryset = queryset.annotate(
            popularity=Count("planetmembership")
        )
        if value is not None:
            queryset = queryset.filter(popularity=value)
        return queryset
