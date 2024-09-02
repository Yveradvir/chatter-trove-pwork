from rest_framework import generics
from rest_framework import status

from rest_framework.response import Response
from rest_framework.request import Request

from ..models import User
from ..serializers import UserSerializer

class CreateUserView(generics.CreateAPIView):
    """API view to create a new user"""

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
