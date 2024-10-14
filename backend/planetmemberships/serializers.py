from rest_framework import serializers
from .models import PlanetMembership

class PlanetMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanetMembership
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True}
        }

    def create(self, validated_data):
        
        return PlanetMembership.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr not in ["created_at", "user", "planet", "id"]:
                setattr(instance, attr, value)

        instance.save()
        return instance
