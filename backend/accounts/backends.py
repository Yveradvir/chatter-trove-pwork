from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import get_token

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed

class JWTAuthenticationMiddleware(MiddlewareMixin):
    """
    Middleware to authenticate users using JWT tokens stored in cookies and ensure
    CSRF protection by setting a CSRF token cookie if it's not already present.
    """

    def process_request(self, request):
        """Authenticate the user by extracting the JWT from the 'access' cookie."""
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

    def process_response(self, request, response):
        """Ensure the CSRF token is set in cookies."""
        if request.COOKIES.get('csrftoken') is None:
            response.set_cookie('csrftoken', get_token(request))
        return response


class CustomJWTAuthentication(JWTAuthentication):
    """Custom JWT authentication class to handle token extraction and validation from cookies."""

    def authenticate(self, request):
        """
        Extract and validate the JWT from the 'access' cookie.

        If the JWT is valid, it returns a tuple of (user, validated_token). If the JWT is
        not present or invalid, it returns None.
        """
        raw_token = request.COOKIES.get("access")
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        return self.get_user(validated_token), validated_token
