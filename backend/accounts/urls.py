from django.urls import path
from .views import (
    CreateUserView, 
    HTTPOnlyCookieTokenObtainPairView,
    HTTPOnlyCookieTokenRefreshView,
    HTTPOnlyTokenBlacklistView
)

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('jwt/token/', HTTPOnlyCookieTokenObtainPairView.as_view(), name='token'),
    path('jwt/token/refresh/', HTTPOnlyCookieTokenRefreshView.as_view(), name='refresh'),
    path('jwt/token/blacklist/', HTTPOnlyTokenBlacklistView.as_view(), name='blacklist'),
]
