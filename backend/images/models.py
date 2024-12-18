import base64
from django.db import models

class ImageModel(models.Model):
    """Model to store images"""

    id = models.AutoField(primary_key=True) 
    
    image = models.BinaryField(blank=True)
    mime_type = models.CharField(max_length=50, blank=True)

    def get_as_b64(self) -> str:
        """
        Convert the stored binary image data to a base64 encoded string.
        
        Returns:
            str: Base64 encoded image string.
        """
        if self.image:
            return f"data:{self.mime_type};base64,{base64.b64encode(self.image).decode('utf-8')}"
        return ''