from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('upload_image/', upload_image, name='upload_image'),
    path('get_images/', get_images, name='get_images')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)