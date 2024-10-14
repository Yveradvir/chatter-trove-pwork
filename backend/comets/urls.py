from django.urls import path
from .views import CometListCreateView

urlpatterns = [
    path('', CometListCreateView.as_view(), name='user-creation'),
    # path('<int:pk>/', OptionsUserView.as_view(), name='user-options'),
]
