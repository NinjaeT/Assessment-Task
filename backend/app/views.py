from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import ImageSerializer
from.models import Image

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request):
    image = request.data
    serializer = ImageSerializer(data = image)
    if serializer.is_valid:
        serializer.save()
        Response(serializer.data)
    Response(serializer.errors)
    
@api_view(['GET'])
def get_images(request):
    images = Image.objects.all()
    Response(images)