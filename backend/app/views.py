from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import ImageSerializer
from.models import Image

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request):
    
    data = request.data
    serializer = ImageSerializer(data = data)
    print(serializer.is_valid())
    if serializer.is_valid():
        serializer.save()
        print("serializer: ",serializer.data)
        return Response(serializer.data)
    print(serializer.errors)
    return Response(serializer.errors)
    
@api_view(['GET'])
def get_images(request):
    images = Image.objects.all()
    return Response(images)