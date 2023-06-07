
import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveVehicleComponents } from "./RetrieveVehicleComponents";


export const CreateVehicleComponents = () => {
    return <AbstractCreateEditPanel selectOptionList={['Brand', 'Vehicle_Model', 'Vehicle']} 
    retriever = {RetrieveVehicleComponents}/>
}