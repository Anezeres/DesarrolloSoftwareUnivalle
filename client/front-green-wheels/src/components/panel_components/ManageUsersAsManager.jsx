import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveManageEmployeesForm } from "../retrievers/RetrieveManageEmployeesForm";


export const ManageUsersAsManager = () => {
    return <AbstractCreateEditPanel selectOptionList={['Seller', 'Workshopboss']} 
    retriever = {RetrieveManageEmployeesForm}/>
}