import axios from 'axios';

/**
* @name: gw_api
* @description: Module that specifies the direct url to the api which allows to exchange
* data with the backend
* @author: Paul Rodrigo Rojas G
* @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
*/

const gw_api = axios.create({
    baseURL: "http://localhost:8000/",
});

export const getAllPersons = () => gw_api('get_persons_list/');