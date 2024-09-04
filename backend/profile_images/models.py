from django.db import models
from accounts.models import User

import base64

class ProfilePicture(models.Model):
    """Model to store user's profile picture as binary data"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    image = models.BinaryField() 

    def get_as_b64(self) -> str:
        """
        Convert the stored binary image data to a base64 encoded string
        Returns:
            str: Base64 encoded image string
        """
        return base64.b64encode(self.image).decode()  
