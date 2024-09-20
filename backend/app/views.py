from django.shortcuts import render
from rest_framework import status
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
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_images(request):
    images = Image.objects.all()
    images_data =[
        {
            'id': image.id,
            'image': request.build_absolute_uri(image.image.url),
            'image_description': image.image_description}
        for image in images 
    ]
    return Response(images_data)

@api_view(['DELETE'])
def delete_image(request, image_id):
    try:
        image = Image.objects.get(id = image_id)
        image.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_200_OK)
    except Image.DoesNotExist:
        return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)