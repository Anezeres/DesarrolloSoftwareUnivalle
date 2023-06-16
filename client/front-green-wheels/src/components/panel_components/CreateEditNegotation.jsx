
import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveNegotationForm } from "../retrievers/RetrieveNegotationForm"; 
import {useState, useEffect} from 'react';
import { getLoggedUser, getGroupIdByPerson } from "../../api/green_wheels.api";


export const CreateEditNegotation = () => {

    [sellerId, setSellerId] = useState(0);

    useEffect(()=>{
        async function getSeller(){
            try {
                const response = getLoggedUser();
                
                if (response.status >= 200 && response.status <= 299) {

                } else {
                    console.log("Ha ocurrido un error");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [])

    return <AbstractCreateEditPanel selectOptionList={['Negotation']} 
    retriever = {RetrieveNegotationForm}/>
}