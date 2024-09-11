from django.urls import path
from .views import (
    PlanetListCreateView,
    OptionsPlanetView,
    PlanetMembershipListCreateView,
    OptionsPlanetMembershipView,
)

urlpatterns = [
    path('planets/', PlanetListCreateView.as_view(), name='create-planet'),
    path('planets/<int:pk>/', OptionsPlanetView.as_view(), name='options-planet'),    
    path('planetmemberships/', PlanetMembershipListCreateView.as_view(), name='create-planet-membership'),
    path('planetmemberships/<int:pk>/', OptionsPlanetMembershipView.as_view(), name='options-planet-membership'),
]
