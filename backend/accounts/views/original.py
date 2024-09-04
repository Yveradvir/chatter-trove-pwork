from rest_framework import generics, status

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.exceptions import NotFound, PermissionDenied

from ..models import User
from ..serializers import UserSerializer

class CreateUserView(generics.CreateAPIView):
    """API view to create a new user"""

    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        """Handle POST requests for creating a user"""
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
        
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        """Save the new user instance"""
        serializer.save()


class OptionsUserView(generics.GenericAPIView):
    """The API view that provide GET, DELETE, PATCH functional"""
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """Allow GET requests for everyone, and PATCH/DELETE only for authenticated users"""
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get_object(self, pk):
        """
        Retrieve a user instance by its primary key (pk).
        """
        try:
            print(pk)
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
        confirmation_password = request.data.get('confirmation_password')
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
        allowed_fields = {'email', 'username', 'nickname'}
        
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