from django.db import models
from django.utils import timezone

from accounts.models import User
from planets.models import Planet

class Comet(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    planet = models.ForeignKey(Planet, on_delete=models.CASCADE)

    title = models.CharField(max_length=80)
    description = models.TextField(null=False)


    created_at = models.DateTimeField(default=timezone.now)
