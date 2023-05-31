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

export const getTestPanel = () => gw_api_panels('test_panel');

// POST

export const postLoginForm = (data) => gw_api.post('login', data, credentials);

export const postLogout = () => gw_api.post('logout');

export const postRegisterForm = (data) => gw_api.post('register', data);

export const postRegisterClientForm = (data) => gw_api.post('create_client', data);

export const postEmailForm = (data) => gw_api.post('send_email', data);




