from django.urls import path
from .views import CometListCreateView, OptionsCometView

urlpatterns = [
    path('', CometListCreateView.as_view(), name='user-creation'),
    path('<int:pk>/', OptionsCometView.as_view(), name='user-options'),
]
