from rest_framework import serializers
from .models import Asteroid

class AsteroidSerializer(serializers.Serializer):
    class Meta:
        model = Asteroid
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True}
        }