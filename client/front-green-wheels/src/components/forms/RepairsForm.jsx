import { CreateEditForm } from "./CreateEditForm"
import { useState, useEffect } from "react";
import {getDiagnosis, getWorkshops, getLoggedUser, getRepairServiceDetails, postCreateRepairService, putEditRepairService } from "../../api/green_wheels.api";

export const RepairForm = ({createdMode}) => {

    const attributes = ['mechanic_name', 'mechanic_id', 'diagnosis_id', 'workshop_id',];

    const [personId, setPersonId] =  useState(0);

    const [diagnosis, setDiagnosis] = useState([]);

    const [workshops, setWorkshops] = useState([]);

    useEffect(()=>{
        async function getWorkshopboss() {
            try {
                const responseUser = await getLoggedUser();

                if (responseUser.status >= 200 && responseUser.status <= 299) {
                    setPersonId(responseUser.data.user.person_id);
                } else {
                    console.log("Ha ocurrido un error");
                }

                const responseDiagnosis = await getDiagnosis();
                const responseWorkshops = await getWorkshops();
                if (responseDiagnosis.status >= 200 && responseDiagnosis.status <= 299 
                && responseWorkshops.status >= 200  && responseWorkshops.status <= 299) {

                    const newDiagnosis = responseDiagnosis.data.map((e,i)=>{
                        e["field"] = "diagnosis_id";
                        e["inputValue"] = "id";
                        return e;
                    });

                    const newWorkshops = responseWorkshops.data.map((e,i)=>{
                        e["field"] = "workshop_id";
                        e["inputValue"] = "id";
                        return e;
                    });
                    
                    console.log(newDiagnosis);
                    console.log(newWorkshops);

                    setDiagnosis(newDiagnosis);
                    setWorkshops(newWorkshops);
                } else {
                    console.log("Ha ocurrido un error")
                }

            } catch (error) {
                console.error(error);
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
    disableAttributes={['diagnosis_id', 'workshop_id']}
    getItems = {passParameterToGet}
    postItem = {postCreateRepairService}
    putItem = {putEditRepairService}
    deleteItem = {null}
    searchBy={['id']}
    showResults={['id']}
    autocompleteInputs={[
        {
            label:"diagnosis_id",
            options:diagnosis,
            searchKeys:["id"],
            showKey:"id",
        }, 
        {
          label:"workshop_id",
          options: workshops,
          searchKeys:["headquarter_id"],
          showKey:"headquarter_id",
      }
      ]}
    />);


}