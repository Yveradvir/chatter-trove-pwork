from django.urls import path
from .views import UserListCreateView, OptionsUserView, GetMeAsUserView

urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-creation'),
    path('me/', GetMeAsUserView.as_view(), name='user-get-me'),
    path('<int:pk>/', OptionsUserView.as_view(), name='user-options'),
]
