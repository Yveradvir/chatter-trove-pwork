from rest_framework import generics, status

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.exceptions import NotFound, PermissionDenied

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import User
from .filters import AccountsFilter
from .serializers import UserSerializer

class UserListCreateView(generics.ListCreateAPIView):
    """API view to list all users or create a new user."""

    queryset = User.objects.all()
    
    permission_classes = [AllowAny]
    serializer_class = UserSerializer    

    filterset_class = AccountsFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        """Save the new user instance."""
        serializer.save()        

class OptionsUserView(generics.RetrieveAPIView):
    """The API view that provide GET, DELETE, PATCH functional"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_object(self, pk):
        """Retrieve a user instance by its primary key (pk)"""
        try:
            return User.objects.get(id=pk)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")

    def check_object_permissions(self, request: Request, obj):
        """
        Ensure that the current user is the owner of the object.
        
        Args:
            request - request from django.
            obj - the django model object that will be checked with user.
        """
        
        if request.user != obj:
            raise PermissionDenied(detail="You do not have permission to modify this user")


    def check_confirmation_password(self, request, user):
        """Authenticate the user by checking the provided confirmation password"""
        confirmation_password = request.data.pop('cpassword')
        
        if not confirmation_password:
            raise PermissionDenied(detail="Confirmation password is required for this operation")
        
        if not user.check_password(confirmation_password):
            raise PermissionDenied(detail="Incorrect confirmation password")


    def get(self, request, pk, *args, **kwargs):
        """Retrieve a user by ID. Available for everyone"""
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        
        return Response(serializer.data)
    
    
    def patch(self, request, pk, *args, **kwargs):
        """Update a user partially by ID. Requires the user to be the owner"""
        allowed_fields = {'email', 'username', 'nickname', 'cpassword'}
        
        # Check if any of the provided fields are not in the whitelist
        invalid_fields = set(request.data.keys()) - allowed_fields
        if invalid_fields:
            return Response(
                {"detail": f"Fields {', '.join(invalid_fields)} are not allowed to be updated."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = self.get_object(pk)
        
        self.check_object_permissions(request, user) 
        self.check_confirmation_password(request, user)
        
        serializer = UserSerializer(user, data=request.data, partial=True)

        
        if serializer.is_valid():
            serializer.save()
        
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, *args, **kwargs):
        """Delete a user by ID. Requires the user to be the owner"""
        
        user = self.get_object(pk)
        self.check_object_permissions(request, user)  

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    