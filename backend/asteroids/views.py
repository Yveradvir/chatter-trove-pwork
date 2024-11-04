from django.db.models import Q

from rest_framework import generics, exceptions
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import Asteroid
from .serializers import AsteroidSerializer
from .filters import AsteroidFilter

from planetmemberships.models import PlanetMembership
from comets.models import Comet

class AsteroidsListCreateView(generics.ListCreateAPIView):
    """API view to list all Asteroids records or create a new one."""

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Asteroid.objects.all()
    serializer_class = AsteroidSerializer
    
    filterset_class = AsteroidFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]

    ordering_fields = ['created_at']
    ordering = ['created_at']
    
    def perform_create(self, serializer):
        user = self.request.user
        comet = serializer.validated_data.get('comet')
                
        if not PlanetMembership.objects.filter(user=user, planet=comet.planet).exists():
            raise exceptions.PermissionDenied("You must be a member of the planet associated with this comet.")
        
        content = serializer.validated_data.get('content')
        if content == '':
            raise exceptions.ValidationError("Cannot post empty asteroid")
        
        reply_at = None
        
        if content.startswith("reply:"):
            try:
                reply_id = int(content.replace(" ", '').replace("reply:", '').split(".")[0])
                reply_at = Asteroid.objects.get(id=reply_id)
            except (ValueError, Asteroid.DoesNotExist):
                raise exceptions.ValidationError("Invalid reply asteroid ID.")
            
            if reply_at.comet_id != comet.id:
                raise exceptions.ValidationError("Your reply asteroid must be on the same comet.")
        
        serializer.save(user=user, reply_at=reply_at)