import { CreateEditForm } from "./CreateEditForm"
import {getDiagnosis, getWorkshops, getReplacementsParts, postCreateReplacement, putEditReplacement } from "../../api/green_wheels.api";
import {useState, useEffect} from 'react';

export const ReplacementPartForm = ({createdMode}) => {

  const attributes = ['name', 'description', 'model_id'];

  const [diagnosis, setDiagnosis] = useState([]);

  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    async function makeRequest () {
        try {
            const responseDiagnosis = await getDiagnosis();
            const responseWorkshops = await getWorkshops();
            if (responseDiagnosis.status >= 200 && responseDiagnosis.status <= 299 
              && responseWorkshops.status >= 200  && responseWorkshops.status <= 299) {

                const newDiagnosis = responseDiagnosis.data.map((e,i)=>{
                    e["field"] = "model_id";
                    e["inputValue"] = "id";
                    return e;
                });

                const newWorkshops = responseWorkshops.data.map((e,i)=>{
                  e["field"] = "model_id";
                  e["inputValue"] = "id";
                  return e;
                });
                
                setDiagnosis(newDiagnosis);
                setWorkshops(newWorkshops);
            } else {
                console.log("Ha ocurrido un error")
            }
        } catch (error) {
            console.log(error);
        }}
        makeRequest();
}, []);

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    disableAttributes={[]}
    getItems = {getReplacementsParts}
    postItem = {postCreateReplacement}
    putItem = {putEditReplacement}
    deleteItem = {null}
    searchBy={['name', 'model_id']}
    showResults={['name', 'model_id']}
    autocompleteInputs={[
      {
          label:"diagnosis_id",
          options:diagnosis,
          searchKeys:["diagnosis_id"],
          showKey:"diagnosis_id",
      }, 
      {
        label:"workshop_id",
        options: workshops,
        searchKeys:["workshop_id"],
        showKey:"workshop_id",
    }
    ]}

    />);
}