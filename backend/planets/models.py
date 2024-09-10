from django.db import models

class Planet(models.Model):
    planetname = models.CharField(max_length=40, unique=True)
    nickname = models.CharField(max_length=80)
    password = models.CharField(max_length=40, blank=True, null=True)

    @property
    def is_private(self):
        return bool(self.password)
