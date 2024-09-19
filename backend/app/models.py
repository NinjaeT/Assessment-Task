from django.db import models

class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    image_description = models.CharField(max_length=255)
        

