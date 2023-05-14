import { useState, useEffect } from "react";
import { getAllCars } from "../api/cars.api";
import { CarCard } from "./CarCard";

/**
* @name: CarsList
* @description: Component that acts as the list of cars.
* @author: Paul Rodrigo Rojas G
* @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
*/


export const CarsList = () => {
    const [cars, setCars] = useState([]);
    useEffect(()=>{
        async function loadCars() {
            const res = await getAllCars();
            setCars(res.data);
        }
        loadCars();
    },[]);

    return <div>
        {cars.map( (car, id)=> (
            <CarCard key={id} car={car}/>
        ))}</div>;
}