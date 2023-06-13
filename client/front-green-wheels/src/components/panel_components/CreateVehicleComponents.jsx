
import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import {RetrieveVehicleComponents} from '../retrievers/RetrieveVehicleComponents';


export const CreateVehicleComponents = () => {
    return ( 
    <div className='heading'>
    <div className='boxvehiculo'>
    <AbstractCreateEditPanel selectOptionList={['Brand', 'Vehicle_Model', 'Vehicle']} 
    retriever = {RetrieveVehicleComponents}/>
    </div>
    </div>
    )
}