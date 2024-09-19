from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('upload_image/', upload_image, name='upload_image'),
    path('get_image/', get_images, name='get_image')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)