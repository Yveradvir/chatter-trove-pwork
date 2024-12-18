from django.db.models import Count
from rest_framework import serializers
from .models import Comet

from profile_images.models import ProfileImage

class CometSerializer(serializers.ModelSerializer):
    additionals = serializers.SerializerMethodField()
    
    class Meta:
        model = Comet
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True},
        }
        
    def get_additionals(self, obj):
        obj: Comet = obj
        pfp = ProfileImage.objects.filter(user=obj.user).first()
        
        asteroids = Comet.objects.filter(id=obj.id).annotate(
            asteroids=Count('asteroid')
        ).values('asteroids').first()
        
        data = {
            "user": {
                "id": obj.user.id,
                "username": obj.user.username,
                "nickname": obj.user.nickname,
                "is_online": obj.user.is_online,
            },
            "is_private": bool(obj.planet.password),
            "pfp": bool(pfp),
            **asteroids
        }
        
        return data

    def create(self, validated_data):
        return Comet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        for attr, value in validated_data.items():
            if attr not in ["created_at", "user", "planet", "id"]:
                setattr(instance, attr, value)

        instance.save()
        return instance
