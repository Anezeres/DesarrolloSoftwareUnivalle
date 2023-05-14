from django.shortcuts import render
from restapp.models import Car
from restapp.serializers import CarSerializer
from rest_framework import permissions, viewsets

# @name: CarViewSet
# @description: View set for Car Model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all();
    serializer_class = CarSerializer;
    #permission_classes = [permissions.IsAuthenticated];