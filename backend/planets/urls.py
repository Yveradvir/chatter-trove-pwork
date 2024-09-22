from django.urls import path
from .views import (
    PlanetListCreateView,
    OptionsPlanetView
)

urlpatterns = [
    path('', PlanetListCreateView.as_view(), name='planet-creation'),
    path('<int:pk>/', OptionsPlanetView.as_view(), name='options-planet'),
]
