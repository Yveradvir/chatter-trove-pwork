from rest_framework import serializers
from .models import Asteroid

class AsteroidSerializer(serializers.ModelSerializer):
    additionals = serializers.SerializerMethodField()
    
    class Meta:
        model = Asteroid
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True},
            'user': {'read_only': True}
        }
        
    def get_additionals(self, obj):
        obj: Asteroid = obj
        
        data = {
            "user": {
                "id": obj.user.id,
                "username": obj.user.username,
                "nickname": obj.user.nickname,
            },
            "planet": obj.comet.planet.id
        }
        
        return data