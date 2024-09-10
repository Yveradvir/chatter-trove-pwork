from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied, APIException

from .models import ProfilePicture
from .serializers import ProfilePictureSerializer

class CreateProfilePictureView(generics.CreateAPIView):
    """API view to create a ProfilePicture record."""

    permission_classes = [IsAuthenticated]
    queryset = ProfilePicture.objects.all()
    serializer_class = ProfilePictureSerializer

    def perform_create(self, serializer):
        """Ensure the image is associated with the correct user"""
        user = self.request.user
        if ProfilePicture.objects.filter(user=user).exists():
            raise APIException(detail="Your profile picture already exists", code=409)
        
        serializer.save(user=user)
        
    def post(self, request, *args, **kwargs):
        """Handle POST requests to create a ProfilePicture record."""
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OptionsProfilePictureView(generics.RetrieveUpdateAPIView):
    """The API view that provides GET, PATCH functionality"""

    queryset = ProfilePicture.objects.all()
    serializer_class = ProfilePictureSerializer

    def get_permissions(self):
        """Allow GET requests for everyone, and PATCH only for authenticated users"""
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get_object(self):
        """Retrieve a ProfilePicture instance by its primary key (pk)"""
        pk = self.kwargs.get('pk')
        try:
            return ProfilePicture.objects.get(id=pk)
        except ProfilePicture.DoesNotExist:
            raise NotFound(detail="ProfilePicture not found")

    def check_object_permissions(self, request, obj):
        """Ensure the current user is the owner of the object."""
        if request.user.id != obj.user.id:
            raise PermissionDenied("You do not have permission to access this object.")
        
    def check_confirmation_password(self, data, user):
        """Authenticate the user by checking the provided confirmation password"""
        confirmation_password = data.pop('cpassword', None)
        
        if not confirmation_password:
            raise PermissionDenied(detail="Confirmation password is required for this operation")
        
        if not user.check_password(confirmation_password):
            raise PermissionDenied(detail="Incorrect confirmation password")

    def get(self, request, *args, **kwargs):
        """Retrieve a ProfilePicture by ID. Available for everyone"""
        profile_picture = self.get_object()
        serializer = self.get_serializer(profile_picture)
                
        return Response(serializer.data)
    
    def patch(self, request, *args, **kwargs):
        """Update a ProfilePicture. Requires the user to be the owner"""
        allowed_fields = {'image_base64', 'password', 'cpassword'}

        # Check if any of the provided fields are not in the whitelist
        invalid_fields = set(request.data.keys()) - allowed_fields
        if invalid_fields:
            return Response(
                {"detail": f"Fields {', '.join(invalid_fields)} are not allowed to be updated."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        profile_picture = self.get_object()
        user = request.user 
        data = request.data.copy()

        self.check_object_permissions(request, profile_picture)
        self.check_confirmation_password(data, user)

        serializer = self.get_serializer(profile_picture, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
