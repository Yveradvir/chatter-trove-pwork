from rest_framework import serializers
from .models import Planet

class PlanetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planet
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True},
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        planet = Planet(**validated_data)
        
        if password:
            planet.set_password(password)
        planet.save()
        
        return planet

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        if password:
            instance.set_password(password)
        instance.save()
        
        return instance
