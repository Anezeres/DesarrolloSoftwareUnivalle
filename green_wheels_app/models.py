from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Group
from django.contrib.auth.base_user import BaseUserManager

from django.contrib.auth.models import Group
from django.db.models.signals import post_migrate
from django.dispatch import receiver


# # Create the user groups when migrating
# @receiver(post_migrate)
# def create_users_groups(sender, **kwargs):
#     Clients_Group, created = Group.objects.get_or_create(name='Clients');
#     Seller_Group, created = Group.objects.get_or_create(name='Sellers');
#     WorkshopBoss_Group, created = Group.objects.get_or_create(name='WorkshopBoss');
#     Manager_Group, created = Group.objects.get_or_create(name='Manager');
#     Admin_Group, created = Group.objects.get_or_create(name='AppAdmin');



# @name: CustomUserManager
# @description: Manager that sets the settings to create an user in the custom model.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com


class CustomUserManager(BaseUserManager):

    def create_user(self, person_id, email, password, id_type=1, **extra_fields):
        if not person_id:
            raise ValueError("Users must have a person id!")
        email = self.normalize_email(email)
        user = self.model(person_id=person_id, email=email, id_type=id_type, **extra_fields);
        user.set_password(password);
        user.save();
        return user;

    def create_superuser(self, person_id, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True);
        extra_fields.setdefault('is_superuser', True);
        extra_fields.setdefault('is_active', True);

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.');
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.');

        names = 'Admin';

        return self.create_user(person_id, email, password, names=names, **extra_fields);


# @name: Gw_Person
# @description: Model that represents the registered 'persons' in the application
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Person(AbstractBaseUser, PermissionsMixin):

    CHOICES = [
        (1, 'National_id'),
        (2, 'International_id'),
    ];

    person_id = models.IntegerField(primary_key=True);
    id_type = models.SmallIntegerField(choices=CHOICES);
    names = models.CharField(max_length=100);
    last_names = models.CharField(max_length=100);
    living_address = models.CharField(max_length=100);
    birth_date = models.DateField(null=True);
    phone1 = models.IntegerField(null=True);
    phone2 = models.IntegerField(null=True);
    email = models.EmailField();

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'person_id';
    REQUIRED_FIELDS =['email'];


    def __str__(self):
        return str(self.person_id);

    objects = CustomUserManager()


# @name: Gw_Client
# @description: Model that represents the clients and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Client(models.Model):
    client_id = models.AutoField(primary_key=True);
    person_id = models.ForeignKey('Gw_Person', related_name='person', on_delete=models.CASCADE);


# @name: Gw_Employee
# @description: Model that represents the employees and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Employee(models.Model):

    CHOICES = [
        (1, 'Seller'),
        (2, 'WorkshopBoss'),
    ];

    employee_id = models.AutoField(primary_key=True);
    position = models.SmallIntegerField(choices=CHOICES);
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);



# @name: Gw_Manager
# @description: Model that represents the managers and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Manager(models.Model):
    manager_id = models.AutoField(primary_key=True);
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);



# @name: Gw_Admin
# @description: Model that represents the admin and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Admin(models.Model):
    admin_id = models.AutoField(primary_key=True);
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);



# @name: Gw_Brand
# @description: Represents the vehicles brands
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Brand(models.Model):
    name = models.CharField(max_length=50);
    country = models.CharField(max_length=50);

    def __str__(self):
        return self.name


# @name: Gw_Vehicle
# @description:
# @author: Julian A. Alvarez Payares
# @email: alvarez.julian@correounivalle.edu.co

class Gw_Vehicle_Model(models.Model):
    name = models.CharField(max_length=50);
    year = models.IntegerField();
    brand = models.ForeignKey('Gw_Brand', on_delete=models.CASCADE)

    def __str__(self):
        return self.name;


# @name: Gw_Vehicle
# @description:
# @author: Julian A. Alvarez Payares
# @email: alvarez.julian@correounivalle.edu.co
class Gw_Vehicle(models.Model):
    plate = models.CharField(primary_key=True, max_length=10);
    made_year = models.IntegerField();
    base_price = models.FloatField();
    guarantee_end_date = models.DateField();
    model_id = models.ForeignKey('Gw_Vehicle_Model', on_delete=models.CASCADE);
    selled = models.BooleanField(default=False);

    def __str__(self):
        return self.plate;

# @name: Gw_Headquarter
# @description: Represents the company's headquarters
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Headquarter(models.Model):
    name = models.CharField(max_length=50);
    city = models.CharField(max_length=50);
    address = models.CharField(max_length=100);



# @name: Gw_Concessionaire
# @description: Representst the concessionaires
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Concessionaire(models.Model):
    headquarter_id = models.ForeignKey('Gw_Headquarter', on_delete=models.CASCADE);



# @name: Gw_Workshop
# @description: Represents the workshops
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Workshop(models.Model):
    workshop_id = models.ForeignKey('Gw_Headquarter', on_delete=models.CASCADE);



# @name: Gw_Associate_Headquarter
# @description: It sets a relation among Persons and Headquarters.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Associate_Headquarter(models.Model):
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);
    headquarter_id = models.ForeignKey('Gw_Headquarter', on_delete=models.CASCADE);



# @name: Gw_Vehicle_Inventory
# @description: Indicates how many instances of a vehicle model are available
# in a concessionaire.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com


class Gw_Vehicle_Inventory(models.Model):
    model_id = models.ForeignKey('Gw_Vehicle_Model', on_delete=models.CASCADE);
    concessionaire_id = models.ForeignKey('Gw_Concessionaire', on_delete=models.CASCADE);
    quantity = models.IntegerField();



# @name: Gw_Replacement_Part
# @description: Represents the replacement parts that the company manages.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Replacement_Part(models.Model):
    name = models.CharField(max_length=50);
    description = models.CharField(max_length=100);
    model_id = models.ForeignKey('Gw_Vehicle_Model', on_delete=models.CASCADE);



# @name: Gw_Replacement_Inventory
# @description: Indicates how many instances of a repplacement part are
# available in a workshop.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Replacement_Inventory(models.Model):
    replacement_id = models.ForeignKey('Gw_Replacement_Part', on_delete=models.CASCADE);
    workshop_id = models.ForeignKey('Gw_Workshop', on_delete=models.CASCADE);
    quantity = models.IntegerField();



 # @name: Gw_Service
 # @description: Represents the services that the company offers.
 # @author: Paul Rodrigo Rojas G.
 # @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Service(models.Model):
    vehicle_plate = models.ForeignKey('Gw_Vehicle', on_delete=models.CASCADE);
    client_id = models.ForeignKey('Gw_Client', on_delete=models.CASCADE);


# @name: Gw_Negotation
# @description: Represents the negotations instances (Cotizaciones).
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Negotation(models.Model):

    CHOICES = [
        (1, 'cash'),
        (2, 'credit_cart'),
    ]

    last_modification_date = models.DateField();
    final_sale_price = models.FloatField();
    pay_method = models.SmallIntegerField(default=1, choices=CHOICES);
    description = models.CharField(max_length=100);


# @name: Gw_Service_Sell_Vehicle
# @description: Represents the selling vehicles service
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Service_Sell_Vehicle(Gw_Service):
    negotation_id = models.ForeignKey('Gw_Negotation', on_delete=models.CASCADE);
    concessionaire_id = models.ForeignKey('Gw_Concessionaire', on_delete=models.CASCADE);


# @name: Gw_Service_Diagnosis_Vehicle
# @description: Represents the diagnosis instances
# @author: Paul Rodrigo Rojas G. and Nicol Valeria Ortiz R
# @email: paul.rojas@correounivalle.edu.co, nicol.ortiz@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Service_Diagnosis_Vehicle(Gw_Service):
    description = models.CharField(max_length=200);
    date = models.CharField(max_length=30);
    price = models.FloatField(null=True);
    mechanic_id = models.IntegerField(null=True);
    mechanic_name = models.CharField(max_length=40, default='');

    def __str__(self):
        return self.id + ' - ' + self.price

# @name: Gw_Repair_Vehicle
# @description: Represents the repairing vehicles service
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Repair_Vehicle(models.Model):
    mechanic_id = models.IntegerField();
    mechanic_name = models.CharField(max_length=100);
    diagnosis_id = models.ForeignKey('Gw_Service_Diagnosis_Vehicle', on_delete=models.CASCADE);
    workshop_id = models.ForeignKey('Gw_Workshop', on_delete=models.CASCADE);



# @name: Gw_Needed_Replacement_Part
# @description: Represents the relation among diagnosis and its needed replacement
# parts
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Needed_Replacement_Part(models.Model):
    diagnosis_id = models.ForeignKey('Gw_Service_Diagnosis_Vehicle', on_delete=models.CASCADE);
    replacement_id = models.ForeignKey('Gw_Replacement_Part', on_delete=models.CASCADE);
    approved = models.BooleanField();


# @name: Gw_Request_Process
# @description: Represents the services requests
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com



class Gw_Request_Process(models.Model):
    requested_date = models.DateField();
    attended = models.BooleanField();
    service_id = models.ForeignKey('Gw_Service', on_delete=models.CASCADE);



# @name: Gw_Attended_Process
# @description: Represents the process of services that have been attended
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Attended_Process(models.Model):
    employee_id = models.ForeignKey('Gw_Employee', on_delete=models.CASCADE);
    attended_date = models.DateField();
    finished_date = models.DateField();
    service_id = models.ForeignKey('Gw_Service', on_delete=models.CASCADE);


# @name: Gw_Panel
# @description: This model represents each of the panel in the 'control page' site.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Panel(models.Model):
    panel_name = models.CharField(max_length=50);

    def __str__(self):
        return self.panel_name;

# @name: Gw_Allowed_Panels
# @description: This models describes what panels are accessible by a user group.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Allowed_Panels(models.Model):
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE);
    panel_id = models.ForeignKey('Gw_Panel', on_delete=models.CASCADE);

    def __str__(self):
        return self.panel_id.panel_name + ' - ' + self.group_id.name;