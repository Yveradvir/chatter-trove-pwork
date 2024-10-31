from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from asgiref.sync import sync_to_async

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed

from django.contrib.auth import get_user_model

User = get_user_model()

class ActivityManager(AsyncWebsocketConsumer):
    async def connect(self):
        token = self.scope['query_string'].decode().split('token=')[1]
        user = await self.authenticate_token(token)
        
        if user:
            self.scope['user'] = user
            await self.channel_layer.group_add("activity_room", self.channel_name)
            await self.accept()
            await self.set_user_active_status(True)
        else:
            await self.close()

    async def disconnect(self, close_code):
        await self.set_user_active_status(False)
        await self.channel_layer.group_discard("activity_room", self.channel_name)

    async def set_user_active_status(self, status):
        user = self.scope['user']
        if user.is_authenticated:
            await database_sync_to_async(User.objects.filter(id=user.id).update)(is_online=status)

    async def authenticate_token(self, token):
        jwt_authenticator = JWTAuthentication()
        try:
            validated_token = jwt_authenticator.get_validated_token(token)
            user = await sync_to_async(jwt_authenticator.get_user)(validated_token)
            return user
        except (InvalidToken, AuthenticationFailed):
            return None
