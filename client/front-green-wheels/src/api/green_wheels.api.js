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

export const getLoggedUser = () => gw_api('user');

export const getUserGroups = (id) => gw_api('get_user_groups/' + id);

export const getAllowedPanels = (id) => gw_api('get_allowed_panels/' + id);

export const getBrands = () => gw_api_viewset('brands');

export const getTestPanel = () => gw_api_panels('test_panel');

export const getVehicleModels = () => gw_api_viewset('vehicle_models')

export const getVehicles = () => gw_api_viewset('vehicles');

export const getNegotations = (id) => gw_api('get_seller_assigned_negotations/' + id);

export const getHeadquarterInventory = (id) => gw_api('get_headquarter_inventory/' + id);

export const getGroupIdByPerson = (id, group) => gw_api('get_group_id_by_person/' + id + '/' + group + '/');

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

// PUT

export const putEditPerson = (data) => gw_api.put('edit', data, credentials);

export const putEditBrand = (id, data) => gw_api_viewset.put('brands/' + id + "/", data, credentials);

export const putEditVehicleModel = (id, data) => gw_api_viewset.put('vehicle_models/' + id + "/", data, credentials);

export const putEditVehicle = (id, data) => gw_api_viewset.put('vehicle/' + id + "/", data, credentials);

export const putEditNegotation = (id, data) => gw_api_viewset.put('negotations/' + id + "/", data, credentials);