
from restapp.models import Car;
from rest_framework import serializers;


# @name: CarSerializer
# @description: This is the serializer for the Car model.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class CarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Car;
        fields = ['plate', 'model_name', 'price'];