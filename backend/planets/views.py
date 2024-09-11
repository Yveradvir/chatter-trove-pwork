from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied, APIException

from .models import Planet, PlanetMembership
from .serializers import PlanetSerializer, PlanetMembershipSerializer

class PlanetListCreateView(generics.ListCreateAPIView):
    """API view to list all planets or create a new planet."""

    permission_classes = [IsAuthenticated]
    queryset = Planet.objects.all()
    serializer_class = PlanetSerializer

    def perform_create(self, serializer):
        """Ensure the planet is created with unique planetname."""
        planetname = serializer.validated_data.get('planetname')
        if Planet.objects.filter(planetname=planetname).exists():
            raise APIException(detail="Planet with this name already exists", code=409)
        
        serializer.save()

class OptionsPlanetView(generics.RetrieveAPIView):
    """API view that provides GET, PATCH functionality for Planet records."""

    queryset = Planet.objects.all()
    serializer_class = PlanetSerializer

    def get_permissions(self):
        """Allow GET requests for everyone, and PATCH only for authenticated users."""
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

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

class PlanetMembershipListCreateView(generics.ListCreateAPIView):
    """API view to list all PlanetMembership records or create a new one."""

    permission_classes = [IsAuthenticated]
    queryset = PlanetMembership.objects.all()
    serializer_class = PlanetMembershipSerializer

    def perform_create(self, serializer):
        """Ensure the membership is created for a specific planet and user."""
        user = self.request.user
        planet = serializer.validated_data.get('planet')

        if PlanetMembership.objects.filter(user=user, planet=planet).exists():
            raise APIException(detail="User is already a member of this planet", code=409)

        serializer.save(user=user)
        
class OptionsPlanetMembershipView(generics.RetrieveUpdateDestroyAPIView):
    """API view to retrieve, update or delete a PlanetMembership record by ID."""
    
    queryset = PlanetMembership.objects.all()
    serializer_class = PlanetMembershipSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Retrieve a PlanetMembership instance by its primary key (pk)."""
        pk = self.kwargs.get('pk')
        try:
            return PlanetMembership.objects.get(id=pk)
        except PlanetMembership.DoesNotExist:
            raise NotFound(detail="PlanetMembership not found")

    def patch(self, request, *args, **kwargs):
        """Partially update a PlanetMembership."""
        membership = self.get_object()
        serializer = self.get_serializer(membership, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        """Delete a PlanetMembership."""
        membership = self.get_object()
        membership.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)