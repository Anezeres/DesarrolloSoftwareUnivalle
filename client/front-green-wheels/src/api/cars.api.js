import axios from 'axios';

/**
* @name: carsApi
* @description: Module that specifies the direct url to the api which allows to exchange
* data with the backend
* @author: Paul Rodrigo Rojas G
* @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
*/

const carsApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/cars/",
});

export const getAllCars = () => carsApi('/');