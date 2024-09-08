import os
import mimetypes
import base64

def generate_b64(filename: str) -> str:
    path = os.path.join(os.path.dirname(__file__), "meta", filename)
    mime_type, _ = mimetypes.guess_type(path)
    if mime_type is None:
        mime_type = 'application/octet-stream'
    
    with open(path, "rb") as file:
        file_content = file.read()
        base64_encoded = base64.b64encode(file_content).decode('utf-8')
    
    return f"data:{mime_type};base64,{base64_encoded}"

def save_base64_to_file(data_url: str, output_filename: str) -> None:
    header, encoded = data_url.split(',', 1)
    mime_type = header.split(':')[1].split(';')[0]
    ext = mimetypes.guess_extension(mime_type)
    
    output_path = os.path.join(os.path.dirname(__file__), "meta", f"{output_filename}{ext}")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "wb") as out_file:
        out_file.write(base64.b64decode(encoded))
        
    # with open(os.path.join(os.path.dirname(output_path), '..', f'b64.txt'), "w") as out_b64:
    #     out_b64.write(data_url)

from pprint import pprint
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()

class ProfilePictureTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='testuser@example.com'
        )
        login = {"username": 'testuser', "password": 'testpassword'}
        self.client.post(reverse('token'), data=login, format='json')
    
    def create_profile_picture(self):
        payload = {
            "user": self.user.id, 
            "image_base64": generate_b64("test_image_1.png")
        }
        response = self.client.post(reverse('new-pfp'), data=payload, format='json')

        return payload, response
    
    def get_profile_picture(self, pfp_id):
        get_profile_picture = self.client.get(
            reverse('pfp-option', kwargs={'pk': int(pfp_id)}), format='json'
        )
        self.assertEqual(get_profile_picture.status_code, status.HTTP_200_OK)
        
        return get_profile_picture.json()
    
    def test_create_profile_picture(self):
        payload, response = self.create_profile_picture() 
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        json = response.json()
        self.assertEqual(json['image'], payload['image_base64'])
        
        json['image'] = f"{json['image'][:30]}..."
        pprint(json)

    def test_options_get_profile_picture(self):
        profile_picture = self.create_profile_picture()[1].json()
        get_profile_picture = self.get_profile_picture(profile_picture['id'])
        
        save_base64_to_file(get_profile_picture['image'], 'get/test_options_get_profile_picture')

    def test_options_patch_profile_picture(self):
        before = self.create_profile_picture()[1].json()
        get_before = self.get_profile_picture(before['id'])
        
        save_base64_to_file(get_before['image'], 'patch/before')
        
        patch_pfp = self.client.patch(
            reverse('pfp-option', kwargs={'pk': int(before['id'])}),
            data={
                "image_base64": generate_b64("test_image_2.jpeg"),
                "cpassword": "testpassword"
            }, format='json'
        )
        
        self.assertEqual(patch_pfp.status_code, status.HTTP_200_OK)
        get_after = self.get_profile_picture(before['id'])
        
        save_base64_to_file(get_after['image'], 'patch/after')

    def tearDown(self):
        self.client.logout()
