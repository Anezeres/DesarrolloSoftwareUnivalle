
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
router.register(r'service_repair_vehicles', Gw_Repair_Vehicle_Service_Viewset);
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
router.register(r'needed_replacement_parts', Gw_Needed_Replacement_Part_Viewset);


urlpatterns = [
    path('', index_render, name = 'index'), # This is just a test.
    path('api/', include(router.urls)),
    path('get_list_requested_repair_services/', get_list_requested_repair_services, name='get_list_requested_repair_services'),
    path('get_list_requested_sell_services/', get_list_requested_sell_services, name='get_list_requested_sell_services'),
    path('get_workshopboss_assigned_repairs/<int:id>/', get_workshopboss_assigned_repairs, name='get_workshopboss_assigned_repairs'),
    path('get_persons_list/', get_persons_list, name='get_persons_list'),
    path('get_person/<int:id>/', get_person, name = 'get_person'),
    path('get_clients_list/', get_clients_list, name='get_clients_list'),
    path('get_client/<int:id>/', get_client, name = 'get_client'),
    path('get_employees_list/', get_employees_list, name='get_employees_list'),
    path('get_employee/<int:id>/', get_employee, name = 'get_employee'),
    path('get_employees_type_list/<int:position>/', get_employees_type_list, name = 'get_employees_type_list'),
    path('post_create_seller/', post_create_seller, name='post_create_seller'),
    path('post_create_workshopboss/', post_create_workshopboss, name='post_create_workshopboss'),
    path('post_create_manager/', post_create_manager, name='post_create_manager'),
    path('get_managers_list/', get_managers_list, name='get_managers_list'),
    path('get_manager/<int:id>/', get_manager, name = 'get_manager'),
    path('post_create_manager/', post_create_manager, name='post_create_manager'),
    path('get_admins_list/', get_admins_list, name='get_admins_list'),
    path('get_admin/<int:id>/', get_admin, name = 'get_admin'),
    path('get_user_groups/<int:id>/', get_user_groups, name = 'get_user_groups'),
    path('get_allowed_panels/<int:id>/', get_allowed_panels, name = 'get_allowed_panels'),
    path('get_seller_assigned_negotations/<int:id>/', get_seller_assigned_negotations, name='get_seller_assigned_negotations'),
    path('get_headquarter_inventory/<int:id>/', get_vehicles_components_headquarter, name = 'get_vehicles_components_headquarter'),
    path('get_group_id_by_person/<int:id>/<slug:group>/', get_group_id_person, name = 'get_group_id_person'),
    path('create_request_sell_service/', create_request_sell_service, name = 'create_request_sell_service'),
    path('create_repair_vehicle_service/', create_repair_vehicle_service, name = 'create_repair_vehicle_service'),
    path('get_repair_details_by_workshopboss/<int:id>/', get_repair_details_by_workshopboss, name = 'get_repair_details_by_workshopboss'),
    path('get_negotations_details_by_seller/<int:id>/', get_negotation_details_by_seller, name = 'get_negotations_details_by_seller'),
    path('check_attended_sell_request/<int:id>/', check_attended_sell_request, name = 'check_attended_sell_request'),
    path('create_new_seller/', create_new_seller, name = 'create_new_seller'),
    path('create_new_workshopboss/', create_new_workshopboss, name = 'create_new_workshopboss'),
    path('create_new_manager/', create_new_manager, name = 'create_new_manager'),
    path('get_manage_users_list_manager/', get_manage_users_list_manager, name = 'get_manage_users_list_manager'),
    path('get_manage_users_list_admin/', get_manage_users_list_admin, name = 'get_manage_users_list_admin'),
    path('set_finish_date_attended_process/<int:id>/', set_finish_date_attended_process, name = 'set_finish_date_attended_process'),
    # PANELS
    path('control_panels/', include('green_wheels_app.panel_urls')),
    # AUTH
    path('register', UserRegister.as_view(), name='register'),
	path('login', UserLogin.as_view(), name='login'),
	path('logout', UserLogout.as_view(), name='logout'),
	path('user', UserView.as_view(), name='user'),
    path('edit', UserEdit.as_view(), name="edit"),
    path('send_email', send_email, name='send_email'),
    path('get_employees_email', get_employees_email, name='get_employees_email'),
    path('create_client', create_client, name='create_client'),
]