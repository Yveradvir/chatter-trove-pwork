from django.conf import settings

from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import HTTPOnlyTokenBlacklistSerializer

s = settings.SIMPLE_JWT

class HTTPOnlyCookieTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        
        for key in response.data.keys():
            print(s[f"{key.upper()}_TOKEN_LIFETIME"].seconds)
            response.set_cookie(
                key, response.data[key], httponly=True,
                max_age=s[f"{key.upper()}_TOKEN_LIFETIME"].seconds
            )
        
        return response
        
class HTTPOnlyCookieTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
    
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        
        response.set_cookie(
            "access", response.data["access"], httponly=True,
            max_age=s[f"ACCESS_TOKEN_LIFETIME"].seconds
        )
            
        return response

class HTTPOnlyTokenBlacklistView(generics.DestroyAPIView):
    serializer_class = HTTPOnlyTokenBlacklistSerializer
    permission_classes = [IsAuthenticated] 
    
    def delete(self, request: Request, *args, **kwargs) -> Response:
        response = Response({}, status=status.HTTP_204_NO_CONTENT)
        
        response.delete_cookie("access")
        response.delete_cookie("refresh")

        request.user = None

        return response