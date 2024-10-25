from django_filters import rest_framework as filters

from .models import ProfileImage

class ProfileImagesFilter(filters.FilterSet):
    class Meta:
        model = ProfileImage 
        fields = {
            "id": ["exact"],
            "user": ["exact"],
        }