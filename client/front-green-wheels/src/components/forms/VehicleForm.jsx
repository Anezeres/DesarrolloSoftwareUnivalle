import { CreateEditForm } from "./CreateEditForm"
import {getVehicleModels, getVehicles, putEditVehicle, postCreateVehicle } from "../../api/green_wheels.api";
import { useState, useEffect } from "react";

export const VehicleForm = ({createdMode}) => {

    const attributes = ['plate', 'made_year','base_price','guarantee_end_date','model_id'];

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
                console.log(error);
            }}
            makeRequest();
    }, []);

    return (<CreateEditForm 
        createdMode={createdMode} 
        attributes={attributes}
        disableAttributes={['model_id']}
        getItems = {getVehicles}
        postItem = {postCreateVehicle}
        putItem = {putEditVehicle}
        deleteItem = {null}
        searchBy={['plate', 'model']}
        showResults={['plate', 'model']}
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