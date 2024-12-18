from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound, APIException, PermissionDenied

from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count

from rest_framework.filters import OrderingFilter

from .models import Comet
from .filters import CometsFilter
from .serializers import CometSerializer

from planetmemberships.models import PlanetMembership
from accounts.models import UserAdditionals

class CometListCreateView(generics.ListCreateAPIView):
    """API view to list all comets or create a new comet."""

    queryset = Comet.objects.all()
    
    permission_classes = [AllowAny]
    serializer_class = CometSerializer    

    filterset_class = CometsFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        """Save the new user instance."""
        serializer.save()        

class OptionsCometView(generics.RetrieveAPIView):
    """API view that provides GET, PATCH functionality for Comet records."""

    queryset = Comet.objects.all()
    serializer_class = CometSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def check_object_permissions(self, request: Request, obj: Comet):
        """
        Ensure that the current user has the right to change or delete something.
        
        Args:
            request - request from django.
            obj - the django model object that will be checked with user.
        """
        user = request.user
        planetmembership = PlanetMembership.objects.filter(user=user.id, planet=obj.planet).first()
        
        isntu = obj.user != user
        
        if bool(obj.planet.password) and not planetmembership:
            raise APIException(detail="You have to be a member of planet to see this comet")

        if request.method == "DELETE":
            if not planetmembership or isntu or planetmembership.user_role not in [1, 2]:
                raise APIException(detail="You do not have permission for deleting it. You're not author of comet or not admin/owner of the planet", code=403)
        elif request.method == "PATCH":
            if isntu:
                raise APIException(detail="You do not have permission for changing it. You're not author of comet", code=403)
                
    def get_object(self):
        """Retrieve a Comet instance by its primary key (pk)."""
        pk = self.kwargs.get('pk')
        try:
            return Comet.objects.get(id=pk)
        except Comet.DoesNotExist:
            raise NotFound(detail="Comet not found")

    def get(self, request, *args, **kwargs):
        """Retrieve a Comet by ID. Available for everyone."""
        comet = self.get_object()
        serializer = self.get_serializer(comet)
        return Response(serializer.data)
    
    def patch(self, request, *args, **kwargs):
        """Update a Comet. Requires specific user permissions."""
        comet = self.get_object()
        self.check_object_permissions(request, comet)

        serializer = self.get_serializer(comet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        comet = self.get_object()

        try:
            membership = PlanetMembership.objects.get(planet=comet.planet, user=request.user)
            
            is_author = request.user == comet.user
            has_privileges = membership.user_role in [1, 2]

            if is_author or has_privileges:
                if is_author:
                    user_additionals = UserAdditionals.objects.get(user=comet.user)
                    
                    if user_additionals.password_for_comet_deleting:
                        password = request.data.get("password")
                        if not password or not request.user.check_password(password):
                            raise PermissionDenied("Invalid password.")

                comet.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            
            raise PermissionDenied("Insufficient permissions to delete this comet.")
        
        except PlanetMembership.DoesNotExist:
            raise PermissionDenied("No membership found for this planet.")