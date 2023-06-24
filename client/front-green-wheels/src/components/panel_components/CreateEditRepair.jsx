import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveRepairForm } from "../retrievers/RetrieveRepairForm";

export const CreateEditRepair = () => {
    return <AbstractCreateEditPanel selectOptionList={['Repair Service']}
    retriever = {RetrieveRepairForm}/>
}