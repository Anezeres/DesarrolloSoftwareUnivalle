from rest_framework import serializers
from green_wheels_app.models import *
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

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



# Here are the serializers that are used for users authentication
UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(
            person_id=clean_data['person_id'],
	        names=clean_data['names'],
		    last_names=clean_data['last_names'],
			email=clean_data['email'],
	        password=clean_data['password'])
		#user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	person_id = serializers.IntegerField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(person_id=clean_data['person_id'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('person_id', 'names')