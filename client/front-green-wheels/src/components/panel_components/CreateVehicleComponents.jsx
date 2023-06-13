
import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import {RetrieveVehicleComponents} from '../retrievers/RetrieveVehicleComponents';


export const CreateVehicleComponents = () => {
    return <AbstractCreateEditPanel selectOptionList={['Brand', 'Vehicle_Model', 'Vehicle']} 
    retriever = {RetrieveVehicleComponents}/>
}