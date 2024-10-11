from .models import PlanetMembership
from rest_framework.exceptions import APIException

def check_planetmemberships_border(user_id):
    BORDER = 10
    
    if PlanetMembership.objects.filter(user=user_id).count() >= BORDER:
        raise APIException(detail="You've got too many memberships", code=400)
