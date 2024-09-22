from django.urls import path
from .views import (
    PlanetMembershipListCreateView,
    OptionsPlanetMembershipView
)

urlpatterns = [
    path('', PlanetMembershipListCreateView.as_view(), name='planetmembership-creation'),
    path('<int:pk>/', OptionsPlanetMembershipView.as_view(), name='options-planetmembership'),
]
