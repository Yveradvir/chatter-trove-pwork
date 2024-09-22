from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, APIException

from .models import PlanetMembership
from .serializers import PlanetMembershipSerializer

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