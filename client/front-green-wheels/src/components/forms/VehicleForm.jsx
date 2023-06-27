import { CreateEditForm } from "./CreateEditForm"
import {getVehicles, putEditVehicle, postCreateVehicle } from "../../api/green_wheels.api";


export const VehicleForm = ({createdMode}) => {

    const attributes = ['plate', 'made_year','base_price','guarantee_end_date','model_id'];

    return (<CreateEditForm 
        createdMode={createdMode} 
        attributes={attributes}
        getItems = {getVehicles}
        postItem = {postCreateVehicle}
        putItem = {putEditVehicle}
        deleteItem = {null}
        searchBy={['plate', 'model']}
        showResults={['plate', 'model']}
        />);
}