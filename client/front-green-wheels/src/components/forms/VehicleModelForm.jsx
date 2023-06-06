import { CreateEditForm } from "./CreateEditForm"
import { getVehicleModels, postCreateVehicleModel, putEditVehicleModel } from "../../api/green_wheels.api";
export const VehicleModelForm = ({createdMode}) => {

    const attributes = ['name', 'year', 'brand'];

    return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    getItems = {getVehicleModels}
    postItem = {postCreateVehicleModel}
    putItem = {putEditVehicleModel}
    deleteItem = {null}
    />);
}