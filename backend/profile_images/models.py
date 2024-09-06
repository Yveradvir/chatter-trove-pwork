from django.db import models
from accounts.models import User
import base64

def file_location(instance, filename, **kwargs):
    file_path = f"static/images/pfp/{instance.user.id}-{filename}"
    return file_path

class ProfilePicture(models.Model):
    """Model to store user's profile picture"""

    id = models.AutoField(primary_key=True) 
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)  
    image = models.ImageField(upload_to=file_location, null=True, blank=True)

    def get_as_b64(self) -> str:
        """
        Convert the stored binary image data to a base64 encoded string.
        
        Returns:
            str: Base64 encoded image string.
        """
        if self.image:
            with self.image.open('rb') as image_file:
                return base64.b64encode(image_file.read()).decode('utf-8')
        return ''
