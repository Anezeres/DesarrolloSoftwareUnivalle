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
    panels = ['test_panel', 'prueba', 'create_seller'];
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
'''
# 1 -> test_panel, 2 -> prueba, 3 -> create_seller
@receiver(post_migrate)
def default_allowed_panels(sender, **kwargs):
    # relation : (panel_id, group_id)
    relations = [(1, 2), (1, 4), (3, 4)];
    for relation in relations:
        try:
            panel = Gw_Panel.objects.get(id=relation[0]);
            group = Group.objects.get(id=relation[1]);
            Gw_Allowed_Panels.objects.get_or_create(panel_id=panel, group_id=group);
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
        return HttpResponse('Unsupported method', status=405)



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
        return HttpResponse('Unsupported method', status=405)




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


# @name: post_create_client
# @description: Creates Clients objects.
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

@panel_permission('create_seller')
def post_create_seller(request):
    if request.method == 'POST':
        try:
            id = int(json.loads(request.body)['id']);
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
    else:
        return HttpResponse('Unsupported method', status=405)


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
        return HttpResponse('Unsupported method', status=405)



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


# @name: Gw_Brand_Viewset
# @description: Viewset for brand model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Brand_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Brand.objects.all();
    serializer_class = Gw_Brand_Serializer;
    def get_permissions(self):
        return [permissions.IsAuthenticated(), HavePanelAccess()]


# @name: Gw_Vehicle_Model_Viewset
# @description: Viewset for vehicles models
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Vehicle_Model_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Vehicle_Model.objects.all();
    serializer_class = Gw_Vehicle_Model_Serializer;



# @name: Gw_Vehicle_Viewset
# @description: Viewset for vehicles
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Vehicle_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Vehicle.objects.all();
    serializer_class = Gw_Vehicle_Serializer;



# This endpoint is just for testing.
def index_render(request):
    print(Gw_Allowed_Panels)
    return HttpResponse("Welcome to Greeen Wheels!");
