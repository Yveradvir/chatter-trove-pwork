from django.urls import path
from .views import (
    UserListCreateView, 
    
    OptionsUserView,
    UserPlanetMembershipsView,
    
    HTTPOnlyCookieTokenObtainPairView,
    HTTPOnlyCookieTokenRefreshView,
    HTTPOnlyTokenBlacklistView
)

urlpatterns = [
    path('accounts/', UserListCreateView.as_view(), name='register'),

    path('accounts/<int:pk>/', OptionsUserView.as_view(), name='user-options'),
    path('accounts/<int:pk>/planetmemberships/', UserPlanetMembershipsView.as_view(), name='user-planet-memberships'),

    path('jwt/token/', HTTPOnlyCookieTokenObtainPairView.as_view(), name='token'),
    path('jwt/token/refresh/', HTTPOnlyCookieTokenRefreshView.as_view(), name='refresh'),
    path('jwt/token/blacklist/', HTTPOnlyTokenBlacklistView.as_view(), name='blacklist'),
]
