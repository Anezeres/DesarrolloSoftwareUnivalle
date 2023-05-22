from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager


# @name: CustomUserManager
# @description: Manager that sets the settings to create an user in the custom model.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com


class CustomUserManager(BaseUserManager):

    def create_user(self, person_id, email, password, **extra_fields):
        if not person_id:
            raise ValueError("Users must have a person id!")
        email = self.normalize_email(email)
        user = self.model(person_id=person_id, email=email, id_type=1,**extra_fields)
        print(user);
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, person_id, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(person_id, email, password, **extra_fields)


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
    email = models.EmailField(null=True);

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



# @name: Gw_Main_Manager
# @description: Model that represents the main manager and it is associated with a person instance.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Admin(models.Model):
    admin_id = models.AutoField(primary_key=True);
    person_id = models.ForeignKey('Gw_Person', on_delete=models.CASCADE);