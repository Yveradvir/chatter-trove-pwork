from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import NotFound, APIException, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import PlanetMembership
from .serializers import PlanetMembershipSerializer
from .filters import PlanetMembershipsFilter
from .utils import check_planetmemberships_border, check_before_create

from planets.serializers import PlanetSerializer

class PlanetMembershipListCreateView(generics.ListCreateAPIView):
    """API view to list all PlanetMembership records or create a new one."""

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = PlanetMembership.objects.all()
    serializer_class = PlanetMembershipSerializer

    filterset_class = PlanetMembershipsFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    
    ordering_fields = ['created_at', 'user_role']
    ordering = ['-created_at', '-user_role']

    def get_queryset(self):
        """Return all memberships if 'user' parameter is provided, otherwise apply pagination."""
        queryset = super().get_queryset()
        user_param = self.request.query_params.get('user', None)
        
        if user_param is not None:
            return queryset.filter(user=user_param)  
        
        return queryset
    
    def perform_create(self, serializer):
        """Ensure the membership is created for a specific planet and user."""
        user = self.request.user
        planet = serializer.validated_data.get('planet')

        if PlanetMembership.objects.filter(user=user, planet=planet).exists():
            raise APIException(detail="User is already a member of this planet", code=409)
        
        check_planetmemberships_border(user.id)    
        if serializer.validated_data.get('user_role') != 0:
            check_before_create(self.request, planet, serializer.validated_data.get('user_role'))
        
        if bool(planet.password):
            password = serializer.validated_data.get('password', None)
            
            if password:
                if not planet.check_password(password):
                    raise PermissionDenied(detail="Incorect password")
            else:
                raise APIException(detail="Password is required", code=400) 
            
        
        serializer.save(user=user)
        
class OptionsPlanetMembershipView(generics.RetrieveUpdateDestroyAPIView):
    """API view to retrieve, update or delete a PlanetMembership record by ID."""
    
    queryset = PlanetMembership.objects.all()
    serializer_class = PlanetMembershipSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

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

@api_view(['GET'])
@permission_classes([AllowAny])
def get_membersiped_planets(request):
    user_id = request.query_params.get('user')
    
    if user_id is None:
        return Response({"detail": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user_id = int(user_id)
    except ValueError:
        return Response({"detail": "Invalid user ID format"}, status=status.HTTP_400_BAD_REQUEST)

    memberships = PlanetMembership.objects.filter(user__id=user_id).select_related('planet').order_by('-planet__created_at')
    data = [PlanetSerializer(membership.planet).data for membership in memberships]

    return Response(data, status=status.HTTP_200_OK)