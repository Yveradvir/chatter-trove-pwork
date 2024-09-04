from rest_framework import generics, status

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request

from .models import ProfilePicture
from .serializers import ProfilePictureSerializer

class CreateProfilePictureView(generics.CreateAPIView):
    """API view to create a ProfilePicture record for a user."""
    
    permission_classes = [IsAuthenticated]
    queryset = ProfilePicture.objects.all()
    serializer_class = ProfilePictureSerializer

    def perform_create(self, serializer):
        """
        Overriding perform_create to ensure the image is saved as binary data
        and associated with the correct user.
        """
        user = self.request.data.get('user')
        image_b64 = self.request.data.get('image')
        
        serializer.save(user=user, image=image_b64)

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Handle POST requests to create a ProfilePicture record.
        
        Validates the incoming data and uses the serializer to save the data 
        if valid, otherwise returns a 400 Bad Request.
        """
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)