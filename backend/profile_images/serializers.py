from rest_framework import serializers
from .models import ProfilePicture
import base64
import binascii

class ProfilePictureSerializer(serializers.ModelSerializer):
    """Serializer for the ProfilePicture model"""
    image_base64 = serializers.CharField(write_only=True)

    id = serializers.CharField(read_only=True)
    image = serializers.SerializerMethodField()
    mime_type = serializers.CharField(read_only=True)

    class Meta:
        model = ProfilePicture
        fields = ['id', 'user', 'image', 'image_base64', 'mime_type']

    def validate_image_base64(self, value):
        """Validate and decode the base64 image string."""
        try:
            if value.startswith('data:'):
                mime_type, base64_data = value.split(';base64,')
                mime_type = mime_type.split(":")[1]
            else:
                base64_data = value
                mime_type = 'image/jpeg'  # Default MIME type

            decoded_file = {
                "mime_type": mime_type,
                "image": base64.b64decode(base64_data)
            }
        except (TypeError, binascii.Error):
            raise serializers.ValidationError("Invalid image base64 data")

        return decoded_file

    def create(self, validated_data):
        """Create a new ProfilePicture instance and store the binary image data."""
        image_data = validated_data.pop('image_base64')
        
        profile_picture = ProfilePicture.objects.create(**validated_data)
        profile_picture.image = image_data['image']
        profile_picture.mime_type = image_data['mime_type']
        profile_picture.save()

        return profile_picture

    def update(self, instance, validated_data):
        """Update an existing ProfilePicture instance with new binary image data if provided."""
        if 'image_base64' in validated_data:
            image_data = validated_data.pop('image_base64')
            instance.image = image_data['image']
            instance.mime_type = image_data['mime_type']

        instance.save()
        return instance

    def get_image(self, obj):
        """Return the base64 encoded image."""
        if obj.image:
            return obj.get_as_b64()
        return None

    def to_representation(self, instance):
        """Convert the ProfilePicture instance to a dictionary."""
        representation = super().to_representation(instance)
        if instance.image:
            base64_image = instance.get_as_b64()
            representation['image'] = base64_image

        return representation
