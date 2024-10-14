from .models import PlanetMembership, User, Planet

from rest_framework.request import Request
from rest_framework.exceptions import APIException

def check_planetmemberships_border(user_id):
    BORDER = 10
    
    if PlanetMembership.objects.filter(user=user_id).count() >= BORDER:
        raise APIException(detail="You've got too many memberships", code=400)

def check_before_create(request: Request, planet_id: int, user_role: int):
    current_planetmembership = PlanetMembership.objects.get(
        user=request.user.id, planet=planet_id
    )
    
    if user_role == 1:
        if current_planetmembership.user_role != 2:
            raise APIException(detail="You do not have the right to appoint a planet administrator", code=403)
    elif user_role == 2:
        if PlanetMembership.objects.get(planet=planet_id, user_role=2):
            raise APIException(detail="Owner of this planet is arleady exist", code=409)
    elif user_role == 3:
        if current_planetmembership.user_role != 1 or current_planetmembership.user_role != 2:
            raise APIException(detail="You do not have the right to block a user on this planet", code=403)