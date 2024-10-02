from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class Planet(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    planetname = models.CharField(max_length=40, unique=True)
    nickname = models.CharField(max_length=80)
    password = models.CharField(max_length=128, blank=True, null=True)
    description = models.TextField(null=False)

    @property
    def is_private(self):
        return bool(self.password)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
