from django.db import models
from django.contrib.auth.models import AbstractBaseUser



# @name: Gw_Person
# @description: Model that represents the registered 'persons' in the application
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Person(AbstractBaseUser):

    CHOICES = [
        (1, 'National_id'),
        (2, 'International_id'),
    ];

    person_id = models.IntegerField(primary_key=True);
    id_type = models.SmallIntegerField(choices=CHOICES);
    names = models.CharField(max_length=100);
    last_names = models.CharField(max_length=100);
    living_address = models.CharField(max_length=100);
    birth_date = models.DateField();
    phone1 = models.IntegerField();
    phone2 = models.IntegerField();
    email = models.EmailField();

    USERNAME_FIELD = 'person_id';
    REQUIRED_FIELDS =['person_id', 'email'];



# @name: Gw_Client
# @description: Model that represents the clients and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Client(models.Model):
    client_id = models.IntegerField(primary_key=True);
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);



# @name: Gw_Employee
# @description: Model that represents the employees and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Employee(models.Model):

    CHOICES = [
        (1, 'Seller'),
        (2, 'WorkshopBoss'),
    ];

    employee_id = models.IntegerField(primary_key=True);
    position = models.SmallIntegerField(choices=CHOICES);
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);



# @name: Gw_Manager
# @description: Model that represents the managers and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Manager(models.Model):
    manager_id = models.IntegerField(primary_key=True);
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);



# @name: Gw_Main_Manager
# @description: Model that represents the main manager and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Main_Manager(models.Model):
    main_manager_id = models.IntegerField(primary_key=True);
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);