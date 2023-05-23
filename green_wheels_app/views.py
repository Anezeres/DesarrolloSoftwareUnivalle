from django.shortcuts import render
from green_wheels_app.models import *
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from green_wheels_app.serializers import *


from django.contrib.auth.models import Group
from django.db.models.signals import post_save
from django.dispatch import receiver


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



# @name: Gw_Brand_Viewset
# @description: Viewset for brand model
# @author: Paul Rodrigo Rojas G.
# @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com

class Gw_Brand_Viewset(viewsets.ModelViewSet):
    queryset = Gw_Brand.objects.all();
    serializer_class = Gw_Brand_Serializer;



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
    return HttpResponse("Welcome to Greeen Wheels!");

