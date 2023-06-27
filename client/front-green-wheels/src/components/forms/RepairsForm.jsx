import { CreateEditForm } from "./CreateEditForm"
import { useState, useEffect } from "react";
import { getLoggedUser, getRepairServiceDetails, postCreateRepairService, putEditRepairService } from "../../api/green_wheels.api";

export const RepairForm = ({createdMode}) => {

    const attributes = ['mechanic_name', 'mechanic_id', 'diagnosis_id', 'workshop_id',];

    const [personId, setPersonId] =  useState(0);

    useEffect(()=>{
        async function getWorkshopboss() {
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
        getWorkshopboss();    
    }, []);

  const passParameterToGet = () => {
    return getRepairServiceDetails(personId);
  }

  return (<CreateEditForm
    createdMode={createdMode}
    attributes={attributes}
    getItems = {passParameterToGet}
    postItem = {postCreateRepairService}
    putItem = {putEditRepairService}
    deleteItem = {null}
    searchBy={['id']}
    showResults={['id']}
    />);


}