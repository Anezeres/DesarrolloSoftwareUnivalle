
import { BrandForm } from "../forms/BrandForm";
import { VehicleModelForm } from "../forms/VehicleModelForm";
import { VehicleForm } from "../forms/VehicleForm";


export const RetrieveVehicleComponents = (selectedOption, createMode) => {

    switch (selectedOption) {
        case 'Brand':
            return <BrandForm createdMode={createMode}/>
        case 'Vehicle_Model':
            return <VehicleModelForm createdMode={createMode}/>;
        case 'Vehicle':
            return <VehicleForm createdMode={createMode}/>
        default:
            return <p>Form not found!</p>
       }
}