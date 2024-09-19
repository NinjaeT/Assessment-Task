from django.contrib import admin
from django.urls import path, include
from app import urls

urlpatterns = [
    path('api/', include(urls)),
]
