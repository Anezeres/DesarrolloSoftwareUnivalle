import { CreateEditForm } from "./CreateEditForm";
import {postCreateNegotation, putEditNegotation, getLoggedUser, getNegotationDetails} from "../../api/green_wheels.api";
import { useState, useEffect } from "react";

export const NegotationForm = ({createdMode}) => {

    const attributes = ['last_modification_date', 'final_sale_price', 'pay_method', 'description'];

    const [personId, setPersonId] =  useState(0);

    useEffect(()=>{
        async function getSeller(){
            try {
                const responseUser = await getLoggedUser();

                if (responseUser.status >= 200 && responseUser.status <= 299) {
                    setPersonId(responseUser.data.user.person_id);
                } else {
                    console.log("Ha ocurrido un error");
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getSeller();    
    }, []);

  const passParameterToGet = () => {
    return getNegotationDetails(personId);
  }

  return (<CreateEditForm
    createdMode={createdMode}
    attributes={attributes}
    getItems = {passParameterToGet}
    postItem = {postCreateNegotation}
    putItem = {putEditNegotation}
    deleteItem = {null}
    searchBy={['id']}
    showResults={['id']}
    />);


}