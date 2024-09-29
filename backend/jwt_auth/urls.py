from django.urls import path
from .views import (
    HTTPOnlyCookieTokenObtainPairView,
    HTTPOnlyCookieTokenRefreshView,
    HTTPOnlyTokenBlacklistView
)

urlpatterns = [
    path('token/', HTTPOnlyCookieTokenObtainPairView.as_view(), name='token-obtain'),
    path('token/refresh/', HTTPOnlyCookieTokenRefreshView.as_view(), name='token-refresh'),
    path('token/blacklist/', HTTPOnlyTokenBlacklistView.as_view(), name='token-blacklist'),
]
