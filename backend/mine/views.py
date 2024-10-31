from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.serializers import UserSerializer

from profile_images.serializers import ProfileImageSerializer
from profile_images.models import ProfileImage

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_access(request):
    return Response({"token": request.COOKIES["access"]}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_me_as_user_view(request):
    user_data = UserSerializer(request.user).data
    return Response(user_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_pfp(request):
    user_id = request.user.id
    
    try:
        profile_image = ProfileImage.objects.get(user=user_id)
    except ProfileImage.DoesNotExist:
        raise NotFound("Profile image not found.")
    
    return Response(ProfileImageSerializer(profile_image).data, status=status.HTTP_200_OK)