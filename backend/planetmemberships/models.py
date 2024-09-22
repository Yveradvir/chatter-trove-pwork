from django.db import models
from django.utils import timezone

from accounts.models import User
from planets.models import Planet

class PlanetMembership(models.Model):
    USER_ROLE_CHOICES = [
        (0, 'User'),
        (1, 'Admin'),
        (2, 'Owner'),
        (3, 'Banned'),
    ]
    
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    planet = models.ForeignKey(Planet, on_delete=models.CASCADE)
    user_role = models.PositiveSmallIntegerField(choices=USER_ROLE_CHOICES, default=0)
    created_at = models.DateTimeField(default=timezone.now)