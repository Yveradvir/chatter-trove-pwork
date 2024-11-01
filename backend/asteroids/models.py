from django.db import models
from django.utils import timezone

from accounts.models import User
from comets.models import Comet

class Asteroid(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comet = models.ForeignKey(Comet, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    content = models.TextField(null=False)
    reply_at = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

    def __str__(self):
        return f'Asteroid {self.id} by {self.user.username}'
