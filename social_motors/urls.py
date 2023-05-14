
from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from restapp import views


urlpatterns = [
    path('', include('restapp.urls')),
    path('admin/', admin.site.urls),
]
