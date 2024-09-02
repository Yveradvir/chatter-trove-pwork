from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating users"""

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'nickname']

    def create(self, validated_data):
        """Create a new user with encrypted password"""
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            nickname=validated_data.get('nickname', '')
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        return user
