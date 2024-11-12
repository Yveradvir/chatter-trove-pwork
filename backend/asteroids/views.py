from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import APIException, NotFound, PermissionDenied, ValidationError

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
            raise PermissionDenied("You must be a member of the planet associated with this comet.")
        
        content = serializer.validated_data.get('content')
        if content == '':
            raise ValidationError("Cannot post empty asteroid")
        
        reply_at = None
        
        if content.startswith("reply:"):
            try:
                reply_id = int(content.replace(" ", '').replace("reply:", '').split(".")[0])
                reply_at = Asteroid.objects.get(id=reply_id)
            except (ValueError, Asteroid.DoesNotExist):
                raise ValidationError("Invalid reply asteroid ID.")
            
            if reply_at.comet_id != comet.id:
                raise ValidationError("Your reply asteroid must be on the same comet.")
        
        serializer.save(user=user, reply_at=reply_at)
        

class OptionsAsteroidView(generics.RetrieveAPIView):
    """API view that provides GET, PATCH functionality for Asteroid records."""

    queryset = Asteroid.objects.all()
    serializer_class = AsteroidSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def check_object_permissions(self, request, obj: Asteroid):
        """
        Ensure that the current user has the right to change or delete something.
        
        Args:
            request - request from django.
            obj - the django model object that will be checked with user.
        """
        user = request.user
        planetmembership = PlanetMembership.objects.filter(user=user.id, planet=obj.comet.planet).first()
        
        if bool(obj.planet.password) and not planetmembership:
            raise APIException(detail="You have to be a member of planet to see this asteroid")

    def get_object(self):
        """Retrieve an Asteroid instance by its primary key (pk)."""
        pk = self.kwargs.get('pk')
        try:
            return Asteroid.objects.get(id=pk)
        except Asteroid.DoesNotExist:
            raise NotFound(detail="Asteroid not found")

    def get(self, request, *args, **kwargs):
        """Retrieve an Asteroid by ID. Available for everyone."""
        comet = self.get_object()
        serializer = self.get_serializer(comet)
        return Response(serializer.data)
    
    def delete(self, request, *args, **kwargs):
        asteroid = self.get_object()

        try:
            membership = PlanetMembership.objects.get(planet=asteroid.comet.planet, user=request.user)
            
            is_author = request.user == asteroid.user
            has_privileges = membership.user_role in [1, 2]

            if is_author or has_privileges:
                asteroid.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            
            raise PermissionDenied("Insufficient permissions to delete this asteroid.")
        
        except PlanetMembership.DoesNotExist:
            raise PermissionDenied("No membership found for this planet.")