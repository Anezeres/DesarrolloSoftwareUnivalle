
from django.urls import path
from green_wheels_app.views import *

urlpatterns = [
    path('get_persons_list/', get_persons_list, name='get_persons_list'),
    path('get_person/<int:id>/', get_person, name = 'get_person'),
    path('get_clients_list/', get_clients_list, name='get_clients_list'),
    path('get_client/<int:id>/', get_client, name = 'get_client'),
]