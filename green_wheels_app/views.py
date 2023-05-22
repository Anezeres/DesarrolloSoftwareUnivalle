from django.shortcuts import render
from green_wheels_app.models import *
from django.http import HttpResponse, JsonResponse

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