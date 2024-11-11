from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import EmailValidator
from django.utils import timezone
from random import randint

def generate_tag(): return f"{randint(0, 9999):04}"

class UserManager(BaseUserManager):
    """Custom manager for User model with standard and superuser creation"""
    
    def create_user(self, username, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password"""
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """Create and return a superuser with elevated permissions"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model supporting standard fields plus additional ones"""
    username = models.CharField(max_length=40, unique=True)
    nickname = models.CharField(max_length=40, blank=True, null=True)
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    password = models.CharField(max_length=128)
    tag = models.CharField(max_length=4, unique=True, default=generate_tag)

    is_active = models.BooleanField(default=True)  
    is_online = models.BooleanField(default=True)  
    is_staff = models.BooleanField(default=False)  
    created_at = models.DateTimeField(default=timezone.now)
    
    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def save(self, *args, **kwargs):
        """Override save method to handle tag generation"""
        if not self.tag:
            self.tag = generate_tag()
        super().save(*args, **kwargs)

    def get_full_name(self):
        """Return the full name for the user (username in this case)"""
        return self.username

    def get_short_name(self):
        """Return the short name for the user (username in this case)"""
        return self.username
    
    
class UserAdditionals(models.Model):
    """Model to store additional user details"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    password_for_pfp_changing = models.BooleanField(default=True) # requires password for pfp changing if it's true
    password_for_comet_deleting = models.BooleanField(default=True) # requires password for comet deleting if it's true
    