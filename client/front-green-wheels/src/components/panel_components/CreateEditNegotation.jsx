
import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveNegotationForm } from "../retrievers/RetrieveNegotationForm";
import {useState, useEffect} from 'react';
import { getLoggedUser, getGroupIdByPerson } from "../../api/green_wheels.api";


export const CreateEditNegotation = () => {

    const [sellerId, setSellerId] = useState(0);

    useEffect(()=>{
        async function getSeller(){
            try {
                const responseUser = getLoggedUser();

                if (responseUser.status >= 200 && responseUser.status <= 399) {
                    const personId = responseUser.data.user.person_id;

                    const sellerResponse = getGroupIdByPerson(personId, 'employee');

                    if (sellerResponse.status >= 200 && sellerResponse.status <= 399) {
                        setSellerId(sellerResponse.data.employee_id);
                    } else {
                        console.log("Ha ocurrido un error");
                    }

                } else {
                    console.log("Ha ocurrido un error");
                }
            } catch (error) {
                console.log("Hola")
                console.log(error);
            }
        }
        getSeller();
        console.log(sellerId);
    }, [])

    return <AbstractCreateEditPanel selectOptionList={['Negotation']}
    retriever = {RetrieveNegotationForm} sellerId={sellerId}/>
}