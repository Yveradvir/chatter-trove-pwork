from django.urls import path
from .views import get_me_as_user_view, get_my_pfp

urlpatterns = [
    path('', get_me_as_user_view, name='get-mine'),
    path('pfp/', get_my_pfp, name='get-mine-pfp'),
]
