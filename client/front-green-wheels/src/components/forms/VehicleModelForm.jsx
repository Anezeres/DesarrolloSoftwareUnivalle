import { CreateEditForm } from "./CreateEditForm"
import { getBrands, getVehicleModels, postCreateVehicleModel, putEditVehicleModel } from "../../api/green_wheels.api";
import { useState, useEffect } from "react";

export const VehicleModelForm = ({createdMode}) => {

    const attributes = ['name', 'year', 'brand'];

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        async function makeRequest () {
            try {
                const response = await getBrands();
                if (response.status >= 200 && response.status <= 299) {
                    const newBrands = response.data.map((e,i)=>{
                        e["field"] = "brand";
                        e["inputValue"] = "id";
                        return e;
                    });
                    setBrands(newBrands);
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
    disableAttributes={['brand']}
    getItems = {getVehicleModels}
    postItem = {postCreateVehicleModel}
    putItem = {putEditVehicleModel}
    deleteItem = {null}
    searchBy={['name', 'year']}
    showResults={['name', 'year']}
    autocompleteInputs={[
        {
            label:"brand",
            options:brands,
            searchKeys:["name"],
            showKey:"name",
        }
    ]}
    />);
}