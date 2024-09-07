import os
import mimetypes
import base64

def generate_b64(filename: str) -> str:
    """
    Generates a base64 string for a given file with the correct MIME type.
    
    Args:
        filename (str): The name of the file located in the 'meta' directory.
    
    Returns:
        str: Base64 string representation of the file with MIME type.
    """
    path = os.path.join(os.path.dirname(__file__), "meta", filename)

    mime_type, _ = mimetypes.guess_type(path)
    if mime_type is None:
        mime_type = 'application/octet-stream'
    
    with open(path, "rb") as file:
        file_content = file.read()
        base64_encoded = base64.b64encode(file_content).decode('utf-8')

    return f"data:{mime_type};base64,{base64_encoded}"

from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()

class ProfilePictureCreationTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='testuser@example.com'
        )
    
        login = {"username": 'testuser', "password": 'testpassword'}
        self.client.post(reverse('token'), data=login, format='json')

    def test_create_profile_picture(self):
        image_base64_str = generate_b64("test_image.png")
        payload = {
            "user": self.user.id,
            "image_base64": image_base64_str
        }
        response = self.client.post(
            reverse('new-pfp'),
            data=payload, format='json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # json = response.json()
        # json['image'] = f"{json['image'][:30]}..."

        # print(json)

    def tearDown(self):
        self.client.logout()