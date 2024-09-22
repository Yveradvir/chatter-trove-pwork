from rest_framework import serializers
from .models import PlanetMembership
    
class PlanetMembershipSerializer(serializers.ModelField):
    class Meta:
        model = PlanetMembership
        fields = '__all__'