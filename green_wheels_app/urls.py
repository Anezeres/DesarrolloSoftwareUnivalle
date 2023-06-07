
from django.urls import path, include
from green_wheels_app.views import *
from rest_framework import routers
from green_wheels_app.views import *
from green_wheels_app.auth_views import *
from green_wheels_app.panel_views import *

router = routers.DefaultRouter();

router.register(r'brands', Gw_Brand_Viewset);
router.register(r'vehicle_models', Gw_Vehicle_Model_Viewset);
router.register(r'vehicles', Gw_Vehicle_Viewset);
router.register(r'service_sell_vehicles', Gw_Service_Sell_Vehicle_Viewset);
router.register(r'negotations', Gw_Negotations_Viewset);
router.register(r'headquarters', Gw_Headquarter_Viewset);
router.register(r'concessionaires', Gw_Concessionaire_Viewset);
router.register(r'workshops', Gw_Workshop_Viewset);
router.register(r'request_process', Gw_Request_Process_Viewset);
router.register(r'attended_process', Gw_Attended_Process_Viewset);
router.register(r'replacement', Gw_Replacement_Viewset);
router.register(r'diagnosis', Gw_Diagnosis_Viewset);
router.register(r'vehicles_inventory', Gw_Vehicles_Inventory_Viewset);
router.register(r'replacements_inventory', Gw_Replacement_Inventory_Viewset);



urlpatterns = [
    path('', index_render, name = 'index'), # This is just a test.
    path('api/', include(router.urls)),
    path('get_persons_list/', get_persons_list, name='get_persons_list'),
    path('get_person/<int:id>/', get_person, name = 'get_person'),
    path('get_clients_list/', get_clients_list, name='get_clients_list'),
    path('get_client/<int:id>/', get_client, name = 'get_client'),
    path('get_employees_list/', get_employees_list, name='get_employees_list'),
    path('get_employee/<int:id>/', get_employee, name = 'get_employee'),
    path('post_create_seller/', post_create_seller, name='post_create_seller'),
    path('post_create_workshopboss/', post_create_workshopboss, name='post_create_workshopboss'),
    path('get_managers_list/', get_managers_list, name='get_managers_list'),
    path('get_manager/<int:id>/', get_manager, name = 'get_manager'),
    path('post_create_manager/', post_create_manager, name='post_create_manager'),
    path('get_admins_list/', get_admins_list, name='get_admins_list'),
    path('get_admin/<int:id>/', get_admin, name = 'get_admin'),
    path('get_user_groups/<int:id>/', get_user_groups, name = 'get_user_groups'),
    path('get_allowed_panels/<int:id>/', get_allowed_panels, name = 'get_allowed_panels'),
    path('get_seller_assigned_negotations/<int:id>/', get_seller_assigned_negotations, name='get_seller_assigned_negotations'),
    path('get_headquarter_inventory/<int:id>/', get_vehicles_components_headquarter, name = 'get_vehicles_components_headquarter'),
    # PANELS
    path('control_panels/', include('green_wheels_app.panel_urls')),
    # AUTH
    path('register', UserRegister.as_view(), name='register'),
	path('login', UserLogin.as_view(), name='login'),
	path('logout', UserLogout.as_view(), name='logout'),
	path('user', UserView.as_view(), name='user'),
    #path('edit', UserEdit.as_view(), name="edit"),
    path('send_email', send_email, name='send_email'),
    path('get_employees_email', get_employees_email, name='get_employees_email'),
    path('create_client', create_client, name='create_client'),
]