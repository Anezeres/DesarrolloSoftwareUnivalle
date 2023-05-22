from rest_framework import serializers
from green_wheels_app.models import *

# @name: Gw_Brand_Serializer
# @description: Serializer for brand model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Brand_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Gw_Brand;
        fields = '__all__';



# @name: Gw_Vehicle_Model
# @description: Serializer for vehicle model model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Vehicle_Model_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Gw_Vehicle_Model;
        fields = '__all__';



# @name: Gw_Vehicle_Serializer
# @description: Serializer for vehicle model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Vehicle_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Gw_Vehicle;
        fields = '__all__';