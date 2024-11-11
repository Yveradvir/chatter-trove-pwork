from rest_framework import serializers
from .models import User, UserAdditionals

class UserAdditionalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdditionals
        fields = '__all__'
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr not in ["user"]:
                setattr(instance, attr, value)
        
        instance.save()  
        return instance

class UserSerializer(serializers.ModelSerializer):
    additionals = UserAdditionalsSerializer(source='useradditionals', read_only=True)
    password = serializers.CharField(write_only=True)
    cpassword = serializers.CharField(write_only=True, required=False)
 
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'email': {'read_only': True},
            'created_at': {'read_only': True},
        }

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        validated_data.pop('cpassword', None)
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
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            if attr not in ["id", "tag", "is_staff", "is_active", "created_at"]:
                setattr(instance, attr, value)

        if password:
            instance.set_password(password)
        instance.save()
        
        return instance
