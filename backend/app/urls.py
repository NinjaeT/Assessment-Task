from django.urls import path
from .views import *

urlpatterns = [
    path('upload_image/', upload_image, name='upload_image'),
    path('get_images/', get_images, name='get_images'),
    path('delete_image/<int:image_id>', delete_image, name='delete_image'),
]

