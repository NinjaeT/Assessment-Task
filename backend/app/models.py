import os
from django.db import models

class Image(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='images/')
    image_description = models.CharField(max_length=255, blank=True, null=True)
    
    def delete(self, *args, **kwargs):
        # Get the file path before deleting the model instance
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
    # Call the parent class's delete method
        super().delete(*args, **kwargs)

