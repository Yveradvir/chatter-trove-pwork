from django.urls import path
from .views import (
    CreateProfilePictureView, 
    OptionsProfilePictureView
)

urlpatterns = [
    path('profile_images/', CreateProfilePictureView.as_view(), name='new-pfp'),
    path('profile_images/<int:pk>/', OptionsProfilePictureView.as_view(), name='pfp-option'),
]
