from rest_framework import serializers
from .models import Planet

class PlanetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planet
        fields = ['planetname', 'nickname', 'password']
    
    def create(self, validated_data):
        return Planet.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance