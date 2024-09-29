from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError
from typing import Dict, Any

class HTTPOnlyTokenBlacklistSerializer(serializers.Serializer):
    refresh = serializers.CharField(write_only=True, required=False)
    token_class = RefreshToken

    def validate(self, attrs: Dict[str, Any]) -> Dict[Any, Any]:
        request = self.context.get("request") 
        refresh_token = attrs.get("refresh") or request.COOKIES.get("refresh") 

        if not refresh_token:
            raise ValidationError({"refresh": "Refresh token is required either in the request body or in the cookies."})
        try:
            refresh = self.token_class(refresh_token)
            refresh.blacklist()
        except AttributeError:
            raise ValidationError({"refresh": "Invalid refresh token."})
        
        return {}
