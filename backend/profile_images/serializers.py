from rest_framework import serializers
from drf_extra_fields.fields import HybridImageField

from accounts.models import User
from .models import ProfilePicture

class ProfilePictureSerializer(serializers.ModelSerializer):
    """Serializer for the ProfilePicture model"""

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    image = HybridImageField(required=True)

    class Meta:
        model = ProfilePicture
        fields = ['user', 'image']
