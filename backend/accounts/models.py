import base64
from django.db import models
from django.core.validators import EmailValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from random import randint

def generate_tag(): return f"{randint(0, 9999):04}"

class UserManager(BaseUserManager):
    """Custom manager for the User model"""
    
    def create_user(self, username, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password"""
        if not email:
            raise ValueError('The Email field must be set')
        user = self.model(username=username, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    """Custom user model for the website"""

    username = models.CharField(max_length=40, unique=True)
    nickname = models.CharField(max_length=40, blank=True, null=True)
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    password = models.CharField(max_length=128)  # Changed length for hashed passwords
    tag = models.CharField(max_length=4, unique=True, default=generate_tag)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def save(self, *args, **kwargs):
        """Override save method to set a tag if not already set"""
        if not self.tag:
            self.tag = generate_tag()
        super().save(*args, **kwargs)

class UserAdditionals(models.Model):
    """Model to store additional user details"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    is_verified = models.BooleanField(default=False)  # Indicates if the user email is verified
