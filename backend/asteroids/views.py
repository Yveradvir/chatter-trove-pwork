from django.shortcuts import render

from rest_framework import generics, exceptions
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import Asteroid
from .serializers import AsteroidSerializer
from .filters import AsteroidFilter

from planetmemberships.models import PlanetMembership

class AsteroidsListCreateRoute(generics.ListCreateAPIView):
    """API view to list all Asteroids records or create a new one."""

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Asteroid.objects.all()
    serializer_class = AsteroidSerializer
    
    filterset_class = AsteroidFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]

    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        user = self.request.user
        
        comet = serializer.validated_data.get('comet')
        if comet and not PlanetMembership.objects.filter(user=user, planet=comet.planet).exists():
            raise exceptions.APIException(detail="You must be a member of the planet associated with this comet.", code=400)
        
        serializer.save(user=user)