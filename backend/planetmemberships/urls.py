from django.urls import path
from .views import (
    PlanetMembershipListCreateView,
    OptionsPlanetMembershipView,
    get_membersiped_planets
)

urlpatterns = [
    path('', PlanetMembershipListCreateView.as_view(), name='planetmembership-creation'),
    path('gmp/', get_membersiped_planets, name='get-membersiped-planets'),
    path('<int:pk>/', OptionsPlanetMembershipView.as_view(), name='options-planetmembership'),
]
