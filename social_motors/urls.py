
from django.contrib import admin
from rest_framework import routers
from django.urls import path, include


urlpatterns = [
    path('', include('green_wheels_app.urls')),
    path('admin/', admin.site.urls),
]
