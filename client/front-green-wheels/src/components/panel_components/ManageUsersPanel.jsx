
import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrievePersonForm} from "../retrievers/RetrieverPersonForm";
import { getUserGroups, getLoggedUser} from "../../api/green_wheels.api";
import {useState, useEffect} from 'react';

//Candidato a borrar
export const ManageUsersPanel = () => {
    const [role, setRole] = useState('');

    useEffect(()=> {
        async function requestGroups () {
            try {
                const responseUser = await getLoggedUser();
                if (responseUser.status >= 200 && responseUser.status <= 299) {
                    const responseGroups = await getUserGroups(responseUser.data.user.person_id); 
                    const groupsList = responseGroups.data.groups;
                    console.log(groupsList);
                    if (responseGroups.status >= 200 && responseGroups.status <= 299){
                        if (groupsList.includes('AppAdmin')) {
                            setRole('AppAdmin');
                        } else if (groupsList.includes('Managers')) {
                            setRole('Manager');
                        } else {
                            console.log("No tienes permisos suficientes para acceder aquí");
                        }
                    } else {
                        console.log("Ha ocurrido un error");
                    }
                } else {
                    console.log("No estás logueado");
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        requestGroups();
    }, []);

    return <AbstractCreateEditPanel selectOptionList={['Person']} 
    retriever = {RetrievePersonForm}/>
}