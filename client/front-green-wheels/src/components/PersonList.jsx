import { useState, useEffect } from "react";
import { getAllPersons } from "../api/green_wheels.api";
import { PersonCard } from "./PersonCard";

/**
* @name: PersonList
* @description: Component that acts as the list of persons.
* @author: Paul Rodrigo Rojas G
* @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
*/

export const PersonList = () => {
    const [persons, setPersons] = useState([]);
    useEffect(()=>{
        async function loadPersons() {
            const res = await getAllPersons();
            setPersons(res.data);
        }
        loadPersons();
    },[]);

    return <div>
        <h1>Hi! This page is just a test. It can be removed if needed</h1>
        {persons.map( (person, id)=> (
            <PersonCard key={id} person={person}/>
        ))}</div>;
}