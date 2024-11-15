from django.urls import path
from .views import (
    AsteroidsListCreateView,
    OptionsAsteroidView
)

urlpatterns = [
    path('', AsteroidsListCreateView.as_view(), name='asteroids-creation'),
    path('<int:pk>/', OptionsAsteroidView.as_view(), name='options-asteroid'),
]
