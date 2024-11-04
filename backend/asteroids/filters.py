from django_filters import rest_framework as filters
from django.db.models import Q
from .models import Asteroid

class AsteroidFilter(filters.FilterSet):
    reply_at = filters.NumberFilter(method='filter_reply_chain')

    def filter_reply_chain(self, queryset, name, value):
        def get_reply_chain(root_id):
            ids = set([root_id])
            new_ids = {root_id}

            while new_ids:
                replies = Asteroid.objects.filter(reply_at_id__in=new_ids).values_list("id", flat=True)
                new_ids = set(replies) - ids
                ids.update(new_ids)

            return ids

        ids = get_reply_chain(value)
        return queryset.filter(id__in=ids)

    class Meta:
        model = Asteroid
        fields = {
            "user": ["exact"],
            "comet": ["exact"],
            "reply_at": ["exact"],
        }
