from django.urls import path
from .views import (
    CreateUserView, 
    OptionsUserView,
    HTTPOnlyCookieTokenObtainPairView,
    HTTPOnlyCookieTokenRefreshView,
    HTTPOnlyTokenBlacklistView
)

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('single/<int:pk>/', OptionsUserView.as_view(), name='user-options'),
    path('jwt/token/', HTTPOnlyCookieTokenObtainPairView.as_view(), name='token'),
    path('jwt/token/refresh/', HTTPOnlyCookieTokenRefreshView.as_view(), name='refresh'),
    path('jwt/token/blacklist/', HTTPOnlyTokenBlacklistView.as_view(), name='blacklist'),
]
