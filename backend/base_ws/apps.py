from django.apps import AppConfig


class BaseWsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base_ws'
