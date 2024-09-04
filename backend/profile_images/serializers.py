import base64

from rest_framework import serializers
from accounts.models import User
from .models import ProfilePicture

class ProfilePictureSerializer(serializers.ModelSerializer):
    """Serializer for the ProfilePicture model"""

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = ProfilePicture
        fields = ['user', 'image']

    def create(self, validated_data):
        """Create a new ProfilePicture instance"""
        user = validated_data['user']
        image_b64 = validated_data['image']
        image_data = base64.b64decode(image_b64)

        profile_picture = ProfilePicture(user=user, image=image_data)
        profile_picture.save()

        return profile_picture

    def to_representation(self, instance) -> str:
        """Convert the ProfilePicture instance into a JSON-serializable format"""
        representation = super().to_representation(instance)
        representation['image'] = instance.get_as_b64()
        
        return representation

    def to_internal_value(self, data) -> dict:
        """Convert the incoming JSON data into a format suitable for saving to the database"""
        if 'image' in data:
            data['image'] = base64.b64decode(data['image'])
        return super().to_internal_value(data)
