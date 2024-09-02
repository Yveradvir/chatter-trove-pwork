from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed


class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        raw_token = request.COOKIES.get('access')

        if raw_token is None:
            return

        jwt_authenticator = JWTAuthentication()
        try:
            validated_token = jwt_authenticator.get_validated_token(raw_token)
            user = jwt_authenticator.get_user(validated_token)
            request.user = user
        except (InvalidToken, AuthenticationFailed):
            request.user = None

class CustomJWTAuthentication(JWTAuthentication):
    """Rewritten JWT Authentication"""
    
    def authenticate(self, request):
        """Collect raw token from cookies, if exist: validate by special method from parent class"""
        raw_token = request.COOKIES.get("access")
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        return self.get_user(validated_token), validated_token
