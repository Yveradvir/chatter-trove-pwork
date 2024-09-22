from django.urls import path
from .views import CreateProfileImageView, OptionsProfileImageView

urlpatterns = [
    path('', CreateProfileImageView.as_view(), name='profile-image-creation'),
    path('<int:pk>/', OptionsProfileImageView.as_view(), name='profile-image-options'),
]
