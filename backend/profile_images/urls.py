from django.urls import path
from .views import (
    CreateProfilePictureView, 
)

urlpatterns = [
    path('new/', CreateProfilePictureView.as_view(), name='register'),
]
