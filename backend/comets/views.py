from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import Comet
from .filters import CometsFilter
from .serializers import CometSerializer


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
