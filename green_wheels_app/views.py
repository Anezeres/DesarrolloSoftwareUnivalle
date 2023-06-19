from green_wheels_app.models import *
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from green_wheels_app.serializers import *

from django.contrib.auth.models import Group
from django.db.models.signals import post_migrate, post_save
from django.dispatch import receiver
from green_wheels_app.permissions import HavePanelAccess, panel_permission
from rest_framework import permissions
from green_wheels_app.auth_views import UserRegister
from green_wheels_app.serializers import UserRegisterSerializer
from django.db.models import Q
import json
from datetime import date

#imports to send an email
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from green_wheels_app.models import Gw_Employee, Gw_Associate_Headquarter
from rest_framework.response import Response


#imports to create a client from frontend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.renderers import JSONRenderer


# @name: create_users_groups
# @description: This function is executed when a migration is performed. It
# creates the user groups.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

@receiver(post_migrate)
def create_users_groups(sender, **kwargs):
    groups = ['Clients', 'Sellers', 'WorkshopBoss', 'Managers', 'AppAdmin'];
    for group in groups:
        Group.objects.get_or_create(name=group);



# @name: create_default_panels
# @description: This function is executed when a migration is performed. It
# creates the default panels.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

@receiver(post_migrate)
def create_default_panels(sender, **kwargs):
    panels = ['test_panel', 'prueba', 'create_seller', 'create_workshopboss', 'create_manager', 'create_vehicle_components',
              'request_sell_service', 'check_inventory', 'check_negotations', 'assign_negotation', 'create_edit_negotation',
              'create_locations', 'manage_users_as_manager', 'manage_users_as_admin'];
    for panel in panels:
        Gw_Panel.objects.get_or_create(panel_name=panel);


# @name: default_allowed_panels
# @description: This function is executed when a migration is performed. It
# creates the default relations among user groups and panels.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
# Sets users groups permission to access panels
'''
id|name        |
--+------------+
 1|Clients     |
 2|Sellers     |
 3|WorkshopBoss|
 4|Manager     |
 5|AppAdmin    |
--------------------------------------
id|panel_name               |
--+-------------------------+
 1|test_panel               |
 2|prueba                   |
 3|create_seller            |
 4|create_workshopboss      |
 5|create_manager           |
 6|create_vehicle_components|
 7|request_sell_service     |
 8|check_inventory          |
 9|check_negotations        |
 10|assign_negotation       |
 11|create_edit_negotation  |
 12|create_locations        |  
 13|manage_users_as_manager |
 14|manage_users_as_admin   |

'''
# 1 -> test_panel, 2 -> prueba, 3 -> create_seller
@receiver(post_migrate)
def default_allowed_panels(sender, **kwargs):
    # relation : (panel_id, group_id)
    relations = [(1, 2), (1, 4), (3, 4), (4, 4), (5, 4), (6, 4), (7, 1), (8, 4), (9, 4), (10, 4), (11, 2),
                 (12, 4), (13,4),(14,5)];
    for relation in relations:
        group_admin = Group.objects.get(id=5);
        try:
            panel = Gw_Panel.objects.get(id=relation[0]);
            group = Group.objects.get(id=relation[1]);
            Gw_Allowed_Panels.objects.get_or_create(panel_id=panel, group_id=group);
            Gw_Allowed_Panels.objects.get_or_create(panel_id=panel, group_id=group_admin);
        except Exception as e:
            print(e);
            print('It has ocurred an error when creating default allowed panels for users groups');




# @name: Add_Person_To_Clients
# @desc: This function associates the person instance to the group Clients when a
# client is created using the person's id.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

@receiver(post_save, sender=Gw_Client)
def Add_Person_To_Clients(sender, instance, created, **kwargs):
    if created:
        person = instance.person_id;
        group, _ = Group.objects.get_or_create(name='Clients');
        person.groups.add(group);


# @name: Add_Person_To_Employees
# @desc: This function associates the person instance to a group related with the
# employees group when an Employees is created using the person's id.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

@receiver(post_save, sender=Gw_Employee)
def Add_Person_To_Employees(sender, instance, created, **kwargs):
    if created:
        person = instance.person_id
        if instance.position == 1: # It's a seller
            group_name = 'Sellers';
        elif instance.position == 2: # It's a workshop boss
            group_name = 'WorkshopBoss';
        group, _ = Group.objects.get_or_create(name=group_name);
        person.groups.add(group);



# @name: Add_Person_To_Managers
# @desc: This function associates the person instance to the group Managers when a
# manager is created using the person's id.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

@receiver(post_save, sender=Gw_Manager)
def Add_Person_To_Managers(sender, instance, created, **kwargs):
    if created:
        person = instance.person_id;
        group, _ = Group.objects.get_or_create(name='Managers');
        person.groups.add(group);



# @name: Add_Person_To_Admins
# @desc: This function associates the person instance to the group AppAdmin when an
# admin is created using the person's id.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

@receiver(post_save, sender=Gw_Admin)
def Add_Person_To_Admins(sender, instance, created, **kwargs):
    if created:
        person = instance.person_id;
        group, _ = Group.objects.get_or_create(name='AppAdmin');
        person.groups.add(group);


# @name: Add_SuperUser_To_Admins
# @description: Add superusers to AppAdmin group.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com


@receiver(post_save, sender=Gw_Person)
def Add_SuperUser_To_Admins(sender, instance, created, **kwargs):
    if created:
        is_superuser = instance.is_superuser;
        if (is_superuser):
            Gw_Admin.objects.create(person_id=instance);
            group, _ = Group.objects.get_or_create(name='AppAdmin');
            instance.groups.add(group);


# @name: get_person_data
# @description: This function extract the data from p person object and retrieve it a dictionary.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_person_data(p):
    data = {
            'person_id': p.person_id,
            'id_type': p.id_type,
            'names': p.names,
            'last_names':p.last_names,
            'living_address':p.living_address,
            'birth_date':str(p.birth_date),
            'phone1':p.phone1,
            'phone2':p.phone2,
            'email':p.email,
        }

    return data;



# @name: get_person
# @description: Get person data given an id.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_person(request, id):
    if request.method == 'GET':
        try:
            p = Gw_Person.objects.get(person_id=id);
        except Gw_Person.DoesNotExist:
            return HttpResponse("Sorry, it does not exist a person with " + str(id) + " id",
                                status=404);

        data = get_person_data(p);

        return JsonResponse(data);

    else:
        return HttpResponse('Unsupported method', status=405);



# @name: get_persons_list
# @description: Get the data from all the person objects.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_persons_list(request):
    if request.method == 'GET':
        person_queryset = Gw_Person.objects.all();

        person_dict = [];

        for p in person_queryset:
            person_dict.append(
                get_person_data(p),
            )

        return JsonResponse(person_dict, safe=False);
    else:
        return HttpResponse('Unsupported method', status=405);


# @name: get_manage_users_list_manager
# @description: Retrieves a list of the users which managers has the permissions to managers.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_manage_users_list_manager(request):
    if request.method == 'GET':
        sellers_list = get_employees_list(request).content.decode('utf-8');
        
        data = json.loads(sellers_list);

        print(data)

        return JsonResponse(data, status=200, safe=False);
        
    else:
        return HttpResponse('Unsupported method', status=405);


# @name: get_manage_users_list_admin
# @description: Retrieves a list of the users which managers has the permissions to the admin.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com


def get_manage_users_list_admin(request):
    if request.method == 'GET':
        managers_list = get_managers_list(request).content.decode('utf-8');
        
        data = json.loads(managers_list)

        return JsonResponse(data, status=200, safe=False);
        
    else:
        return HttpResponse('Unsupported method', status=405);

# @name: get_clients_list
# @description: Get the data from all the client objects
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_clients_list(request):
    if request.method == 'GET':
        client_queryset = Gw_Client.objects.all();

        client_dict = [];

        for c in client_queryset:
            client_obj = get_person_data(c.person_id);
            client_obj['client_id'] = c.client_id;
            client_dict.append(
                client_obj,
            )

        return JsonResponse(client_dict, safe=False);
    else:
        return HttpResponse('Unsupported method', status=405);




# @name: get_client
# @description: Get client data given a client id
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
def get_client(request, id):
    if request.method == 'GET':
        try:
            c = Gw_Client.objects.get(client_id=id);
        except Gw_Client.DoesNotExist:
            return HttpResponse("Sorry, it does not exist a client with " + str(id) + " id",
                                status=404);

        data = get_person_data(c.person_id);

        data['client_id'] = c.client_id;

        return JsonResponse(data);
    else:
        return HttpResponse('Unsupported method', status=405);




# @name: post_create_seller
# @description: Creates Seller objects.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

#@panel_permission('create_seller')
def post_create_seller(request):
    #if request.method == 'POST':
    try:
        #id = int(json.loads(request.body)['id']);
        id = int(request['id']);
        person_exists = Gw_Person.objects.filter(person_id=id).exists();
        seller_exists = Gw_Employee.objects.filter(Q(person_id=id) & Q(position=1)).exists();
        if (not person_exists):
            return HttpResponse('Person object was not found', status=404);
        elif (seller_exists):
            print(id)
            return HttpResponse('Seller already exists', status=400);
        else:
            person = Gw_Person.objects.get(person_id=id);
            Gw_Employee.objects.create(person_id=person, position=1);
            return HttpResponse('The User has been created', status=200);
    except Exception as e:
        print(e);
        return HttpResponse('An error has ocurred', status=400);
    #else:
     #   return HttpResponse('Unsupported method', status=405);



# @name: create_new_seller
# @description: Allows to create persons instances and assign them automatically into employees group with
# seller position.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def create_new_seller(request):
    if request.method == 'POST':
        try:
            register_instance = UserRegister();

            data = json.loads(request.body.decode('utf-8'));

            register_instance.post(data);

            data_seller = {
                'id': data['person_id']
            }

            post_create_seller(data_seller);

            return HttpResponse('Correcto', status=200);
        except Exception as e:
            print(e);
            return HttpResponse('Error', status=400);
    else:
        return HttpResponse('Unsupported method', status=405);



# @name: create_new_workshopboss
# @description: Allows to create persons instances and assign them automatically into employees group with
# workshopboss position.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def create_new_workshopboss(request):
    if request.method == 'POST':
        try:
            register_instance = UserRegister();

            data = json.loads(request.body.decode('utf-8'));

            register_instance.post(data);

            data_workshopboss = {
                'id': data['person_id']
            }

            post_create_workshopboss(data_workshopboss);

            return HttpResponse('Correcto', status=200);
        except Exception as e:
            print(e);
            return HttpResponse('Error', status=400);
    else:
        return HttpResponse('Unsupported method', status=405);

# @name: create_new_manager
# @description: Allows to create persons instances and assign them automatically into managers group.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def create_new_manager(request):
    if request.method == 'POST':
        try:
            register_instance = UserRegister();

            data = json.loads(request.body.decode('utf-8'));

            register_instance.post(data);

            data_manager= {
                'id': data['person_id']
            }

            post_create_manager(data_manager);

            return HttpResponse('Correcto', status=200);
        except Exception as e:
            print(e);
            return HttpResponse('Error', status=400);
    else:
        return HttpResponse('Unsupported method', status=405);


# @name: get_group_id_person
# @description: Retrieves the group id for the person with the given person_id and
# given group id.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_group_id_person(request, id, group):
    if (request.method=='GET'):
        user_model = None;
        if group == 'client':
            user_model = Gw_Client;
        elif group == 'employee':
            user_model = Gw_Employee;
        elif group == 'manager':
            user_model = Gw_Manager;
        elif group == 'admin':
            user_model = Gw_Admin;
        else:
            return HttpResponse("Sorry, the specified group does not exist", status=404);

        try:
            group_id = user_model.objects.get(person_id=id).pk;
            print(group_id)
            data = {
                'id':group_id
            };

            return JsonResponse(data);
        except Exception as e:
            print("Hola a todos")
            print(e);
            return HttpResponse('Sorry, an error has ocurred', status=500);

    else:
        return HttpResponse('Unsupported method', status=405);


# @name: post_create_workshopboss
# @description: Creates WorkshopBoss objects.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

#@panel_permission('create_workshopboss')
def post_create_workshopboss(request):
    #if request.method == 'POST':
    try:
        #id = int(json.loads(request.body)['id']);
        id = int(request['id']);
        person_exists = Gw_Person.objects.filter(person_id=id).exists();
        workshop_boss_exists = Gw_Employee.objects.filter(Q(person_id=id) & Q(position=2)).exists();
        if (not person_exists):
            return HttpResponse('Person object was not found', status=404);
        elif (workshop_boss_exists):
            print(id)
            return HttpResponse('workshop_boss already exists', status=400);
        else:
            person = Gw_Person.objects.get(person_id=id);
            Gw_Employee.objects.create(person_id=person, position=2);
            return HttpResponse('The User has been created', status=200);
    except Exception as e:
        print(e);
        return HttpResponse('An error has ocurred', status=400);
    #else:
     #   return HttpResponse('Unsupported method', status=405)


# @name: post_create_manager
# @description: Creates WorkshopBoss objects.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

#@panel_permission('create_manager')
def post_create_manager(request):
    #if request.method == 'POST':
    try:
        #id = int(json.loads(request.body)['id']);
        id = int(request['id']);
        person_exists = Gw_Person.objects.filter(person_id=id).exists();
        manager_exists = Gw_Manager.objects.filter(Q(person_id=id)).exists();
        if (not person_exists):
            return HttpResponse('Person object was not found', status=404);
        elif (manager_exists):
            print(id)
            return HttpResponse('manager already exists', status=400);
        else:
            person = Gw_Person.objects.get(person_id=id);
            Gw_Manager.objects.create(person_id=person);
            return HttpResponse('The User has been created', status=200);
    except Exception as e:
        print(e);
        return HttpResponse('An error has ocurred', status=400);
    #else:
     #   return HttpResponse('Unsupported method', status=405)


# @name: get_employees_list
# @description: Get the data from all the employee objects
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_employees_list(request):
    if request.method == 'GET':
        employee_queryset = Gw_Employee.objects.all();

        employee_dict = [];

        for c in employee_queryset:
            employee_obj = get_person_data(c.person_id);
            employee_obj['employee_id'] = c.employee_id;
            employee_dict.append(
                employee_obj,
            )

        return JsonResponse(employee_dict, safe=False);
    else:
        return HttpResponse('Unsupported method', status=405)


def get_employees_type_list(request, position):
    if request.method == 'GET':
        employee_queryset = Gw_Employee.objects.all();

        employee_dict = [];

        for c in employee_queryset:
            employee_obj = get_person_data(c.person_id);
            if c.position == position:
                employee_obj['employee_id'] = c.employee_id;
                employee_dict.append(
                    employee_obj,
                )

        return JsonResponse(employee_dict, safe=False);
    else:
        return HttpResponse('Unsupported method', status=405)

# @name: get_employee
# @description: Get employee data given a employee id
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_employee(request, id):
    if request.method == 'GET':
        try:
            c = Gw_Employee.objects.get(employee_id=id);
        except Gw_Employee.DoesNotExist:
            return HttpResponse("Sorry, it does not exist a employee with " + str(id) + " id",
                                status=404);

        data = get_person_data(c.person_id);

        data['employee_id'] = c.employee_id;

        return JsonResponse(data);

    else:
        return HttpResponse('Unsupported method', status=405);



# @name: get_managers_list
# @description: Get the data from all the employee objects
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_managers_list(request):
    if request.method == 'GET':
        manager_queryset = Gw_Manager.objects.all();

        manager_dict = [];

        for c in manager_queryset:
            manager_obj = get_person_data(c.person_id);
            manager_obj['manager_id'] = c.manager_id;
            manager_dict.append(
                manager_obj,
            )

        return JsonResponse(manager_dict, safe=False);
    else:
        return HttpResponse('Unsupported method', status=405)



# @name: get_manager
# @description: Get manager data given a manager id
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_manager(request, id):
    if request.method == 'GET':
        try:
            m = Gw_Manager.objects.get(manager_id=id);
        except Gw_Manager.DoesNotExist:
            return HttpResponse("Sorry, it does not exist a manager with " + str(id) + " id",
                                status=404);

        data = get_person_data(m.person_id);

        data['manager_id'] = m.manager_id;

        return JsonResponse(data);

    else:
        return HttpResponse('Unsupported method', status=405);


# @name: get_admins_list
# @description: Get the data from all the employee objects
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_admins_list(request):
    if request.method == 'GET':
        admin_queryset = Gw_Admin.objects.all();

        admin_dict = [];

        for c in admin_queryset:
            admin_obj = get_person_data(c.person_id);
            admin_obj['admin_id'] = c.admin_id;
            admin_dict.append(
                admin_obj,
            )

        return JsonResponse(admin_dict, safe=False);
    else:
        return HttpResponse('Unsupported method', status=405);



# @name: get_admin
# @description: Get admin data given a admin id
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_admin(request, id):
    if request.method == 'GET':
        try:
            a = Gw_Admin.objects.get(admin_id=id);
        except Gw_Admin.DoesNotExist:
            return HttpResponse("Sorry, it does not exist a admin with " + str(id) + " id",
                                status=404);

        data = get_person_data(a.person_id);

        data['admin_id'] = a.admin_id;

        return JsonResponse(data);

    else:
        return HttpResponse('Unsupported method', status=405);


def get_user_groups(request, id):
    if request.method == 'GET':
        try:
            p = Gw_Person.objects.get(person_id=id);
        except Gw_Person.DoesNotExist:
            return HttpResponse("Sorry, it does not exist a person with " + str(id) + " id",
                                    status=404);

        groups = p.groups.values();

        groups_list = [];

        for g in groups:
            groups_list.append(g['name']);

        # print(groups_list);

        data = {
            'groups':groups_list#groups_list
        };

        return JsonResponse(data);#JsonResponse(data);

    else:
        return HttpResponse('Unsupported method', status=405);


# @name: get_allowed_panels
# @description: Retrivies a list of the panels which the user has access.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_allowed_panels(request, id):
    if request.method == 'GET':
        try:
            person = Gw_Person.objects.get(person_id=id);

            groups_id = person.groups.values('id')

            groups_id_list = [];

            for g in groups_id:
                groups_id_list.append(g['id']);

            panels = Gw_Allowed_Panels.objects.filter(group_id__in=groups_id_list).values('panel_id__panel_name');

            panels_list = [];

            for panel in panels:
                panels_list.append(panel['panel_id__panel_name']);

            data = {
                'panels':panels_list
            }

            return JsonResponse(data);

        except Gw_Person.DoesNotExist:
            return HttpResponse("Sorry, it does not exist a person with " + str(id) + " id",
                                    status=404);
    else:
        return HttpResponse('Unsupported method', status=405);


# @name: get_seller_assigned_negotations
# @description: Get all the negotations assigned to a seller
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_seller_assigned_negotations(request, id):
    if request.method == 'GET':
        query = Gw_Attended_Process.objects.filter(employee_id=id).values(
                                                                          'id',
                                                                          'employee_id',
                                                                          'attended_date',
                                                                          'finished_date',
                                                                          'service_id');

        data = [];

        for elem in query:
            if not elem['finished_date']:
                data.append({'id':elem['id'],
                    'employee_id':elem['employee_id'],
                                'attended_date':elem['attended_date'],
                                'finished_date':elem['finished_date'],
                                'service_id':elem['service_id']});

        return JsonResponse(data, safe=False);
    else:
        return HttpResponse('Unsupported method', status=405);


def get_vehicles_components_headquarter(request, id):
    if request.method == 'GET':
        query_vehicles = Gw_Vehicle_Inventory.objects.filter(concessionaire_id__headquarter_id=id).values('model_id__name',
                                                                                                          'quantity');
        query_replacements = Gw_Replacement_Inventory.objects.filter(workshop_id__headquarter_id=id).values('replacement_id__name',
                                                                                                           'quantity');

        data = [];

        data_vehicles = [];

        data_replacements = [];

        for v in query_vehicles:
            data_vehicles.append({'model':v['model_id__name'], 'quantity':v['quantity']});

        for r in query_replacements:
            data_replacements.append({'replacement':r['replacement_id__name'], 'quantity':v['quantity']});

        data.append({'vehicles_inventory':data_vehicles});
        data.append({'replacement_inventory':data_replacements});

        return JsonResponse(data, safe=False);
    else:
        return HttpResponse('Unsupported method', status=405);



# @name: create_request_sell_service
# @description: This endpoint allows to create requested_process instances assign to sell_service instances.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def create_request_sell_service(request):
    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8');
            response = aux_create_sell_service_and_negotation(request.user, json.loads(data));
            new_data = response.content.decode('utf-8');

            service_instance_id = json.loads(new_data)['id'];

            service_instance = Gw_Service_Sell_Vehicle.objects.get(id=service_instance_id);

            Gw_Request_Process.objects.create(service_id=service_instance, requested_date=date.today(), attended=False);
        except Exception:
            return HttpResponse('Ha ocurrido une error', status=500);

        return HttpResponse('Exito', status=200);
    else:
        return HttpResponse('Unsupported method', status=405);




# @name: aux_create_diagnosis_repair_service
# @description: This method creates a sell_service that is already associated with an empty negotation
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def aux_create_diagnosis_repair_service(user, data):
    try:
        user = user;

        empty_diagnosis_data = {
            'vehicle_plate':data['vehicle_plate'],
            'client_id':data['client_id'],
            'description':'empty',
            'date':None,
            'price':0,
            'mechanic_id':0,
            'mechanic_name':'empty',
            
        }

        diagnosis_serializer = Gw_Diagnosis_Viewset.serializer_class(data=empty_diagnosis_data,
                                                                    context={'author':user});
    
        if diagnosis_serializer.is_valid():

            diagnosis_serializer.save();
            diagnosis_id = diagnosis_serializer.data['id'];

            repair_service_data = {
                "mechanic_name":"empty",
                "mechanic_id":0,
                "diagnosis_id":diagnosis_id,
                "workshop_id":data['workshop_id'] 
                }

            repair_service_serializer = Gw_Repair_Vehicle_Service_Viewset.serializer_class(data=repair_service_data,
                                            context={'author': user})

            if repair_service_serializer.is_valid():
                repair_service_serializer.save()
                return JsonResponse(repair_service_serializer.data, status=status.HTTP_201_CREATED);
            else:
                return JsonResponse(repair_service_serializer.errors, status=status.HTTP_400_BAD_REQUEST);
    except Exception as e:
        print(e);
        return HttpResponse("Ha ocurrido un error", status=500);
    else:
        return JsonResponse(diagnosis_serializer.errors, status=status.HTTP_400_BAD_REQUEST);




# @name: create_repair_vehicle_service
# @description: This endpoint allows to create requested_process instances assign to sell_service instances.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def create_repair_vehicle_service(request):
    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8');

            response = aux_create_diagnosis_repair_service(request.user, json.loads(data));
            new_data = response.content.decode('utf-8');

            service_instance_id = json.loads(new_data)['id'];

            print(service_instance_id)

            service_instance = Gw_Service_Diagnosis_Vehicle.objects.get(id=service_instance_id);

            Gw_Request_Process.objects.create(service_id=service_instance, requested_date=date.today(), attended=False);
        except Exception as e:
            print(e);
            return HttpResponse('Ha ocurrido une error', status=500);

        return HttpResponse('Exito', status=200);
    else:
        return HttpResponse('Unsupported method', status=405);



# @name: get_negotation_details_by_seller
# @description: This endpoint retrieves in a list the data of the negotations that are assigned to an user
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def get_negotation_details_by_seller(request, id):
    if request.method == 'GET':
        try:
            employee_id = Gw_Employee.objects.get(person_id=id).employee_id;

            list_services_id = Gw_Attended_Process.objects.filter(employee_id=employee_id).values('service_id__id');

            negotations_queryset = Gw_Service_Sell_Vehicle.objects.filter(Q(id__in=list_services_id)).values(
                'negotation_id__id',
                'negotation_id__final_sale_price',
                'negotation_id__last_modification_date',
                'negotation_id__pay_method',
                'negotation_id__description'
            );

            data = [];

            for e in negotations_queryset:
                data.append({
                    'id':e['negotation_id__id'],
                    'last_modification_date':e['negotation_id__last_modification_date'],
                    'final_sale_price':e['negotation_id__final_sale_price'],
                    'pay_method':e['negotation_id__pay_method'],
                    'description':e['negotation_id__description']
                });

            print(negotations_queryset[0])

            return JsonResponse(data, status=200, safe=False);



        except Exception as e:
            print(e);          
            return HttpResponse('Ha ocurrido un error', status=400);  
    else:
        return HttpResponse('Unsupported method', status=405);


# @name: set_finish_date_attended_process
# @description: This function sets an attended process's date to the current one indicating that
# the given process was finished or eliminated.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def set_finish_date_attended_process(request, id):
    if request.method == 'PUT':
        try:        
            process = Gw_Attended_Process.objects.get(id=id);
        
            process.finished_date = date.today();
        
            process.save();
        
            return HttpResponse('Correcto', status=200);
        except Exception as e:
            print(e);
            return HttpResponse('An error has ocurred', status=400);
    else:
        return HttpResponse('Unsupported method', status=405);



# @name: Gw_Brand_Viewset
# @description: Viewset for brand model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Brand_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Brand.objects.all();
    serializer_class = Gw_Brand_Serializer;
    def get_permissions(self):
        return [permissions.IsAuthenticated(), HavePanelAccess('create_vehicle_components')];


# @name: Gw_Vehicle_Model_Viewset
# @description: Viewset for vehicles models
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Vehicle_Model_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Vehicle_Model.objects.all();
    serializer_class = Gw_Vehicle_Model_Serializer;
    def get_permissions(self):
        return [permissions.IsAuthenticated(), HavePanelAccess('create_vehicle_components')];



# @name: Gw_Vehicle_Viewset
# @description: Viewset for vehicles
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Vehicle_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Vehicle.objects.all();
    serializer_class = Gw_Vehicle_Serializer;
    def get_permissions(self):
        return [permissions.IsAuthenticated(), HavePanelAccess('create_vehicle_components')];



# @name: check_attended_sell_request
# @description: Marks a sell request as attended
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def check_attended_sell_request(request):
    if request.method == 'POST':
        try:
            request_id = request.POST.data.request_id;
            
            sell_request = Gw_Request_Process.objects.get(id=request_id);

            sell_request.attended =  True;

            sell_request.save();

            return HttpResponse('Correcto', status=200);    
        except Exception as e:
            print(e);
            return HttpResponse('Ha ocurrido un error', status=400);    
    else:
        return HttpResponse('Unsupported method', status=405);



# @name: aux_create_sell_service_and_negotation
# @description: This method creates a sell_service that is already associated with an empty negotation
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

def aux_create_sell_service_and_negotation(user, data):

    user = user;

    empty_negotation_data = {
        'last_modification_date':'2000-01-01',
        'final_sale_price':0,
        'pay_method':1,
        'description':'empty'
    }

    negotation_serializer = Gw_Negotations_Viewset.serializer_class(data=empty_negotation_data,
                                    context={'author':user});



    if negotation_serializer.is_valid():

        negotation_serializer.save();
        negotation_id = negotation_serializer.data['id'];

        sell_service_data = {
            "vehicle_plate": data['vehicle_plate'],
            "client_id": data['client_id'],
            "negotation_id": negotation_id,
            "concessionaire_id": data['concessionaire_id']
            }

        sell_service_serializer = Gw_Service_Sell_Vehicle_Viewset.serializer_class(data=sell_service_data,
                                        context={'author': user})

        if sell_service_serializer.is_valid():
            sell_service_serializer.save()
            return JsonResponse(sell_service_serializer.data, status=status.HTTP_201_CREATED);
        else:
            return JsonResponse(sell_service_serializer.errors, status=status.HTTP_400_BAD_REQUEST);

    else:
        return JsonResponse(negotation_serializer.errors, status=status.HTTP_400_BAD_REQUEST);




# @name: Gw_Service_Sell_Vehicle_Viewset
# @description: Viewset for service sell vehicles model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Service_Sell_Vehicle_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Service_Sell_Vehicle.objects.all();
    serializer_class = Gw_Service_Sell_Vehicle_Serializer;

    def create(self, request, *args, **kwargs):
        return aux_create_sell_service_and_negotation(request.user, request.data);


# @name: Gw_Negotation_Viewset
# @description: Viewset for negotations.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Negotations_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Negotation.objects.all();
    serializer_class = Gw_Negotations_Serializer;
    # def get_permissions(self):
    #     return [permissions.IsAuthenticated(), HavePanelAccess('create_negotiation_panel')];



# @name: Gw_Headquarter_Viewset
# @description: Viewset for Headquarters
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Headquarter_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Headquarter.objects.all();
    serializer_class = Gw_Headquarter_Serializer;


# @name: Gw_Concessionaire_Viewset
# @description: Viewset for Concessionaires
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Concessionaire_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Concessionaire.objects.all();
    serializer_class = Gw_Concessionaire_Serializer;


# @name: Gw_Workshop_Viewset
# @description: Viewset for workshop model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com


class Gw_Workshop_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Workshop.objects.all();
    serializer_class = Gw_Workshop_Serializer;



# @name: Gw_Replacement_Inventory_Viewset
# @description: Viewset for replacements inventory model.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Replacement_Inventory_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Replacement_Inventory.objects.all();
    serializer_class = Gw_Replacement_Inventory_Serializer;


# @name: Gw_Request_Process_Viewset
# @description: Viewset for request process models
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Request_Process_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Request_Process.objects.all();
    serializer_class = Gw_Request_Process_Serializer;

    # def create(self, request, *args, **kwargs):
    #     user = request.user;

    #     data = request.data;

    #     print(data)

    #     process_data = {
    #         'employee_id':data['employee_id'],
    #         'attended_date':data['attended_date'],
    #         'finished_date':data['finished_date'],
    #         'service_id':data['service_id']
    #     }

    #     process_serializer = self.serializer_class(data=process_data,
    #                                     context={'author':user});


    #     if process_serializer.is_valid():
    #         process_serializer.save();
        
    #         was_requested = Gw_Request_Process.objects.filter(
    #             service_id=process_data['service_id']).exists();

    #         if was_requested:
    #             requested_process = Gw_Request_Process.objects.get(service_id=process_data['service_id']);

    #             requested_process.attended = True;

    #             requested_process.save();

    #         return JsonResponse(process_serializer.data, status=status.HTTP_201_CREATED);
    #     else:
    #         return JsonResponse(process_serializer.errors, status=status.HTTP_400_BAD_REQUEST);
        

# @name: Gw_Attended_Process_Viewset
# @description: Viewset for attended process model.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com


class Gw_Attended_Process_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Attended_Process.objects.all();
    serializer_class = Gw_Attended_Process_Serializer;

# @name: Gw_Repair_Vehicle_Service_Viewset
# @description: Viewset for repair vehicle service
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Repair_Vehicle_Service_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Repair_Vehicle.objects.all();
    serializer_class = Gw_Repair_Vehicle_Service_Serializer;


# @name: Gw_Diagnosis_Viewset
# @description: Viewset for diagnosis
# @author: Nicol Valeria Ortiz R.
# @email: nicol.ortiz@correounivalle.edu.co, nicolvaleria0919@gmail.com

class Gw_Diagnosis_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Service_Diagnosis_Vehicle.objects.all();
    serializer_class = Gw_Diagnosis_Serializer;

    def create(self, request, *args, **kwargs):
        return aux_create_diagnosis_repair_service(request.user, request.data);
    #def get_permissions(self):
     #   return [permissions.IsAuthenticated(), HavePanelAccess('create_diagnosis_panel')];

# @name: Gw_Replacement_Viewset
# @description: Viewset for replacement part
# @author: Nicol Valeria Ortiz R.
# @email: nicol.ortiz@correounivalle.edu.co, nicolvaleria0919@gmail.com

class Gw_Replacement_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Replacement_Part.objects.all();
    serializer_class = Gw_Replacement_Part_Serializer;
    def get_permissions(self):
        return [permissions.IsAuthenticated(), HavePanelAccess('create_replacement_panel')];



# @name: Gw_Vehicle_Inventory_Viewset
# @description: Viewset for vehicle inventory viewset
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Vehicles_Inventory_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Vehicle_Inventory.objects.all();
    serializer_class = Gw_Vehicle_Inventory_Serializer;




# This endpoint is just for testing.
def index_render(request):
    print(Gw_Allowed_Panels)
    return HttpResponse("Welcome to Greeen Wheels!");

# @name: send_email
# @description: Receive the data from frontend and send email
# @author: Nicol Valeria Ortiz Rodríguez
# @email: nicol.ortiz@correounivalle.edu.co, nicolvaleria0919@gmail.com

@panel_permission('send_email')
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)  # Obtener los datos enviados por POST como JSON
        correo_destinatario = data['correo_destinatario']
        asunto = data['asunto']
        mensaje = data['mensaje']

        template = render_to_string('email_template.html', {
            'correo_destinatario': correo_destinatario,
            'asunto': asunto,
            'mensaje': mensaje
        })

        email = EmailMessage(
            asunto,
            template,
            settings.EMAIL_HOST_USER,
            correo_destinatario.split(',')
        )

        email.fail_silently = False
        email.send()

        return JsonResponse({'message': 'Exito'})


# @name: get_employees_email
# @description: Get all employees with same headquater as the manager
# @author: Nicol Valeria Ortiz Rodríguez
# @email: nicol.ortiz@correounivalle.edu.co, nicolvaleria0919@gmail.com

def get_employees_email(request):
    if request.method == 'GET':
        gw_manager_id = request.user.person_id
        gw_manager_headquarter_id = Gw_Associate_Headquarter.objects.get(person_id=gw_manager_id).headquarter_id_id
        headquarter_list_ass = Gw_Associate_Headquarter.objects.all()
        employee_emails = []

        for headq in headquarter_list_ass:
            if (headq.headquarter_id_id == gw_manager_headquarter_id):
                employee_email = headq.person_id.email
                person = Gw_Person.objects.get(person_id=headq.person_id.person_id);
                if (person.person_id != gw_manager_id):
                    groups = person.groups.values();
                    id_groups = []
                    for g in groups:
                        id_groups.append(g['id'])
                    employee_emails.append((employee_email,id_groups))

        return JsonResponse(employee_emails, safe=False)
    else:
        return HttpResponse('Unsupported method', status=405)

# @name: create_client
# @description: Get the data send by the frontend and store object client
# @author: Nicol Valeria Ortiz Rodríguez
# @email: nicol.ortiz@correounivalle.edu.co, nicolvaleria0919@gmail.com

@api_view(['POST'])
@permission_classes([AllowAny])
def create_client(request):
    user_register = UserRegister()
    response = user_register.post(request)

    if response.status_code == status.HTTP_201_CREATED:
        response.accepted_renderer = JSONRenderer()  # Establecer el renderizador aceptado como JSONRenderer
        response.accepted_media_type = 'application/json'  # Establecer el tipo de medio aceptado
        response.renderer_context = {}  # Establecer el contexto del renderizador como un diccionario vacío
        response.render()  # Renderizar la respuesta antes de acceder a su contenido

        data = json.loads(response.content)
        person_id = data.get('person_id')

        if person_id:
            gw_person = Gw_Person.objects.get(person_id=person_id)  # Obtener la instancia de Gw_Person correcta
            client = Gw_Client.objects.create(person_id=gw_person)
            client.save()
            print('esta es:', gw_person)
            return JsonResponse({'message': 'Éxito'})

    return JsonResponse({'message': 'Error'}, status=status.HTTP_400_BAD_REQUEST)










