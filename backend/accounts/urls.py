from django.urls import path
from .views import UserListCreateView, OptionsUserView

urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-creation'),
    path('<int:pk>/', OptionsUserView.as_view(), name='user-options'),
]
