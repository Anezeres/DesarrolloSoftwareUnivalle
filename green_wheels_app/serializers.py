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


# @name: Gw_Service_Sell_Vehicle_Serializer
# @description: Serializer for service sell vehicles model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Service_Sell_Vehicle_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Gw_Service_Sell_Vehicle;
        fields = '__all__';

# @name: Gw_Negotations_Serializer
# @description: Serializer for negotations.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Negotations_Serializer(serializers.ModelSerializer):
      class Meta:
        model = Gw_Negotation;
        fields = '__all__';


# @name: Gw_Headquarter_Serializer
# @description: Serializer for headquarter
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Headquarter_Serializer(serializers.ModelSerializer):
		class Meta:
			model = Gw_Headquarter;
			fields = '__all__';


# @name: Gw_Concessionaire_Serializer
# @description: Serializer for concessionaires
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Concessionaire_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Gw_Concessionaire;
		fields = '__all__';



# @name: Gw_Request_Process_Serializer
# @description: Serializer for request process serializer model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Request_Process_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Gw_Request_Process;
		fields = '__all__';


# @name: Gw_Attended_Process
# @description: Serializerfor attended process model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Attended_Process_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Gw_Attended_Process;
		fields = '__all__';


# @name: Gw_Replacement_Part_Serializer
# @description: Viewset for replacement part
# @author: Nicol Valeria Ortiz R.
# @email: nicol.ortiz@correounivalle.edu.co, nicolvaleria0919@gmail.com

class Gw_Replacement_Part_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Gw_Replacement_Part;
        fields = '__all__';

# @name: Gw_Diagnosis_Serializer
# @description: Viewset for diagnosis
# @author: Nicol Valeria Ortiz R.
# @email: nicol.ortiz@correounivalle.edu.co, nicolvaleria0919@gmail.com

class Gw_Diagnosis_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Gw_Service_Diagnosis_Vehicle;
        fields = '__all__';


# @name: Gw_Vehicles_Inventory_Serializer
# @description: Serializer for vehicle inventory model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Vehicle_Inventory_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Gw_Vehicle_Inventory;
		fiels = '__all__';


# @name: Gw_Workshop_Serializer
# @description: Serializer for workshops
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Workshop_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Gw_Workshop;
		fields = '__all__';

# @name: Gw_Replacements_Inventory_Serializer
# @description: Serializer for replacements inventory
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Replacement_Inventory_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Gw_Replacement_Inventory;
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
	    	id_type=clean_data['id_type'],
	        names=clean_data['names'],
		    last_names=clean_data['last_names'],
			email=clean_data['email'],
	        password=clean_data['password'],
			birth_date=clean_data['birth_date'],
			phone1=clean_data['phone1'],
			phone2=clean_data['phone2'],
			living_address=clean_data['living_address'],
			)

		user_obj.save()
		return user_obj



class UserEditSerializer(serializers.Serializer):
	class Meta:
		model = UserModel;
		fields = '__all__';

	def edit(self, data):
		
		try:
			user = UserModel.objects.get(person_id=data['person_id']);
			fields = ['id_type', 'names', 'last_names', 'email',
	     		'birth_date', 'phone1', 'phone2', 'living_address'];
			
			for f in fields:
				if f in data:
					setattr(user, f, data[f]);
		
			if 'password' in data:
				user.set_password(data['password']);

			user.save();
		
			return user;
		except Exception:
			print("Ha ocurrido un error");

		

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