from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, APIException

from .models import Planet
from .serializers import PlanetSerializer
from .filters import PlanetFilter
from django.db.models import Count

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from planetmemberships.models import PlanetMembership
from planetmemberships.utils import check_planetmemberships_border

class PlanetListCreateView(generics.ListCreateAPIView):
    """API view to list all planets or create a new planet."""

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Planet.objects.all()
    serializer_class = PlanetSerializer

    def get_queryset(self):
        queryset = Planet.objects.all()

        queryset = queryset.annotate(popularity=Count('planetmembership'))

        return queryset

    filterset_class = PlanetFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    
    ordering_fields = ['created_at', 'popularity']
    ordering = ['-created_at', '-popularity']


    def perform_create(self, serializer):
        """Ensure the planet is created with unique planetname."""
        check_planetmemberships_border(user_id=self.request.user.id)
        
        planetname = serializer.validated_data.get('planetname')
        
        if Planet.objects.filter(planetname=planetname).exists():
            raise APIException(detail="Planet with this name already exists", code=409)
        
        
        planet = serializer.save()
        PlanetMembership.objects.create(
            user=self.request.user,
            planet=planet,
            user_role=2  # Owner
        )
        

class OptionsPlanetView(generics.RetrieveAPIView):
    """API view that provides GET, PATCH functionality for Planet records."""

    queryset = Planet.objects.all()
    serializer_class = PlanetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        """Retrieve a Planet instance by its primary key (pk)."""
        pk = self.kwargs.get('pk')
        try:
            return Planet.objects.get(id=pk)
        except Planet.DoesNotExist:
            raise NotFound(detail="Planet not found")

    def get(self, request, *args, **kwargs):
        """Retrieve a Planet by ID. Available for everyone."""
        planet = self.get_object()
        serializer = self.get_serializer(planet)
        return Response(serializer.data)
    
    def patch(self, request, *args, **kwargs):
        """Update a Planet. Requires specific user permissions."""
        planet = self.get_object()
        self.check_object_permissions(request, planet)

        serializer = self.get_serializer(planet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)