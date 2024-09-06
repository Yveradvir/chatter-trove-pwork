from django.urls import path
from .views import (
    CreateProfilePictureView, 
    OptionsProfilePictureView
)

urlpatterns = [
    path('new/', CreateProfilePictureView.as_view(), name='new-pfp'),
    path('single/<int:pk>/', OptionsProfilePictureView.as_view(), name='pfp-option'),
]
