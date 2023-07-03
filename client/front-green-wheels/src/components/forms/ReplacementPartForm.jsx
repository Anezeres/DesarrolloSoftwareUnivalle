import { CreateEditForm } from "./CreateEditForm"
import {getVehicleModels, getReplacementsParts, postCreateReplacement, putEditReplacement } from "../../api/green_wheels.api";
import {useState, useEffect} from 'react';

export const ReplacementPartForm = ({createdMode}) => {

  const attributes = ['name', 'description', 'model_id'];

  const [vehiclesModels, setVehiclesModels] = useState([]);

  useEffect(() => {
    async function makeRequest () {
        try {
            const response = await getVehicleModels();

            if (response.status >= 200 && response.status <= 299) {

                const newVehiclesModels = response.data.map((e,i)=>{
                    e["field"] = "model_id";
                    e["inputValue"] = "id";
                    return e;
                });

                setVehiclesModels(newVehiclesModels);
            } else {
                console.log("Ha ocurrido un error")
            }
        } catch (error) {

            console.error(error);
        }}
        makeRequest();
}, []);

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    disableAttributes={['model_id']}
    getItems = {getReplacementsParts}
    postItem = {postCreateReplacement}
    putItem = {putEditReplacement}
    deleteItem = {null}
    searchBy={['name', 'model_id']}
    showResults={['name', 'model_id']}
    autocompleteInputs={[
      {
          label:"model_id",
          options:vehiclesModels,
          searchKeys:["name"],
          showKey:"name",
      }
    ]}

    />);
}