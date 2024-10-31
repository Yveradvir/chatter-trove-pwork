from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/online/', consumers.ActivityManager.as_asgi()),
]
