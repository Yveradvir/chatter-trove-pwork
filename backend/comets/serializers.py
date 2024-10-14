from rest_framework import serializers
from .models import Comet

class CometSerializer(serializers.Serializer):
    class Meta:
        model = Comet
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True},
        }

        
    def create(self, validated_data):
        return Comet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        for attr, value in validated_data.items():
            if attr not in ["created_at", "user", "planet", "id"]:
                setattr(instance, attr, value)

        instance.save()
        return instance
