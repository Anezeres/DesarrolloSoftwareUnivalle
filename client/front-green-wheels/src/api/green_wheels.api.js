import axios from 'axios';

/**
* @name: gw_api
* @description: Module that specifies the direct url to the api which allows to exchange
* data with the backend
* @author: Paul Rodrigo Rojas G
* @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const gw_api = axios.create({
    baseURL: "http://localhost:8000/",
});

const gw_api_panels = axios.create({
  baseURL: "http://localhost:8000/control_panels/",
});

const gw_api_viewset = axios.create({
  baseURL: "http://localhost:8000/api/",
});


const credentials = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }


// GET
export const getAllPersons = () => gw_api('get_persons_list');

export const getClients = () => gw_api('get_clients_list');

export const getManagers = () => gw_api('get_managers_list');

export const getEmployeesTypeList = (position) => gw_api('get_employees_type_list/' + position + '/');

export const getLoggedUser = () => gw_api('user');

export const getUserGroups = (id) => gw_api('get_user_groups/' + id);

export const getAllowedPanels = (id) => gw_api('get_allowed_panels/' + id);

export const getBrands = () => gw_api_viewset('brands');

export const getTestPanel = () => gw_api_panels('test_panel');

export const getVehicleModels = () => gw_api_viewset('vehicle_models')

export const getVehicles = () => gw_api_viewset('vehicles');

export const getAssignedNegotations = (id) => gw_api('get_seller_assigned_negotations/' + id);

export const getAssignedRepairs = (id) => gw_api('get_workshopboss_assigned_repairs/' + id);

export const getHeadquarterInventory = (id) => gw_api('get_headquarter_inventory/' + id);

export const getGroupIdByPerson = (id, group) => gw_api('get_group_id_by_person/' + id + '/' + group + '/');

export const getRequestedProcesses = () => gw_api_viewset('request_process/');

export const getNegotationDetails = (id) => gw_api('get_negotations_details_by_seller/' + id);

export const getRepairServiceDetails = (id) => gw_api('get_repair_details_by_workshopboss/' + id);

export const getHeadquarters = () => gw_api_viewset('headquarters');

export const getConcessionaires = () => gw_api_viewset('concessionaires');

export const getWorkshops = () => gw_api_viewset('workshops');

export const getManageUserManager = () => gw_api('get_manage_users_list_manager');

export const getManageUserAdmin = () => gw_api('get_manage_users_list_admin');

export const getListSellServices = () => gw_api('get_list_requested_sell_services');

export const getListRepairServices = () => gw_api('get_list_requested_repair_services');

// POST

export const postLoginForm = (data) => gw_api.post('login', data, credentials);

export const postLogout = () => gw_api.post('logout');

export const postRegisterForm = (data) => gw_api.post('register', data);

export const postRegisterClientForm = (data) => gw_api.post('create_client', data);

export const postEmailForm = (data) => gw_api.post('send_email', data);

export const postCreateSeller = (id) => gw_api.post('post_create_seller/', id, credentials);

export const postCreateWorkshopBoss = (id) => gw_api.post('post_create_workshopboss/', id, credentials);

export const postCreateManager = (id) => gw_api.post('post_create_manager/', id, credentials);

export const postCreateBrand = (data) => gw_api_viewset.post('brands/', data, credentials);

export const postCreateVehicleModel = (data) => gw_api_viewset.post('vehicle_models/', data, credentials);

export const postCreateVehicle = (data) => gw_api_viewset.post('vehicles/', data, credentials);

export const postCreateNegotation = (data) => gw_api_viewset.post('negotations/', data, credentials);

export const postCreateSellService = (data) => gw_api_viewset.post('service_sell_vehicles/', data, credentials);

export const postCreateRequestRepairVehicle = (data) => gw_api.post('create_repair_vehicle_service/', data, credentials);

export const postCreateRequestSellService = (data) => gw_api.post('create_request_sell_service/', data, credentials);

export const postCreateAttendedProcess = (data) => gw_api_viewset.post('attended_process/', data, credentials);

export const postCreateHeadquarter = (data) => gw_api_viewset.post('headquarters/', data, credentials);

export const postCreateConcessionaire = (data) => gw_api_viewset.post('concessionaires/', data, credentials);

export const postCreateRepairService = (data) => gw_api_viewset.post('service_repair_vehicles/', data, credentials);

export const checkAttendedRequest = (data) => gw_api.post('check_attended_sell_request/', data, credentials);

export const createNewSeller = (data) => gw_api.post('create_new_seller/', data, credentials);

export const createNewWorkshopboss = (data) => gw_api.post('create_new_workshopboss/', data, credentials);

export const createNewManager = (data) => gw_api.post('create_new_manager/', data, credentials);

export const postCreateWorkshop = (data) => gw_api_viewset.post('workshops/', data, credentials);


// PUT

export const putEditPerson = (data) => gw_api.put('edit', data, credentials);

export const putEditBrand = (id, data) => gw_api_viewset.put('brands/' + id + "/", data, credentials);

export const putEditVehicleModel = (id, data) => gw_api_viewset.put('vehicle_models/' + id + "/", data, credentials);

export const putEditVehicle = (id, data) => gw_api_viewset.put('vehicle/' + id + "/", data, credentials);

export const putEditNegotation = (id, data) => gw_api_viewset.put('negotations/' + id + "/", data, credentials);

export const putEditRepairService = (id, data) => gw_api_viewset.put('service_repair_vehicles/' + id + '/', data, credentials);

export const putEditHeadquarter = (id, data) => gw_api_viewset.post('headquarters/' + id + "/", data, credentials);

export const putEditConcessionaire = (id, data) => gw_api_viewset.post('concessionaires/' + id + "/", data, credentials);

export const putEditWorkshop = (id, data) => gw_api_viewset.post('workshops/' + id + "/", data, credentials);

export const setFinishedDate = (id) => gw_api.put('set_finish_date_attended_process/' + id + "/", credentials);
