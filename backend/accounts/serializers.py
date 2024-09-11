from rest_framework import serializers
from .models import User, UserAdditionals

class UserAdditionalsSerializer(serializers.ModelSerializer):
    """Serializer for reading additionals of user"""

    class Meta:
        model = UserAdditionals
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating users"""
    additionals = UserAdditionalsSerializer(source='useradditionals', read_only=True)
    password = serializers.CharField(write_only=True)
    

    class Meta:
        model = User
        fields = [
            'username', 
            'email', 
            'password', 
            'nickname', 
            'additionals'
        ]

    def create(self, validated_data):
        """Create a new user with encrypted password"""
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            nickname=validated_data.get('nickname', '')
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        additionals = UserAdditionals(user=user)
        additionals.save()
        
        return user