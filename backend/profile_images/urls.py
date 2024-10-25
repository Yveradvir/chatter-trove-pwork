from django.urls import path
from .views import ProfileImageListCreateView, OptionsProfileImageView

urlpatterns = [
    path('', ProfileImageListCreateView.as_view(), name='profile-image-creation'),
    path('<int:pk>/', OptionsProfileImageView.as_view(), name='profile-image-options'),
]
