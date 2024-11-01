from django.urls import path
from .views import (
    AsteroidsListCreateView,
)

urlpatterns = [
    path('', AsteroidsListCreateView.as_view(), name='asteroids-creation')
]
