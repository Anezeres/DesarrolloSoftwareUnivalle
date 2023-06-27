import { ManageSellersForm } from "../forms/ManageSellersForm"
import { ManageWorkShopBossForm } from "../forms/ManageWorkshopbossForm";

export const RetrieveManageEmployeesForm = (selectedOption, createMode) => {

    switch (selectedOption) {
        case 'Seller':
            return <ManageSellersForm createdMode={createMode}/>
        case 'Workshopboss':
            return <ManageWorkShopBossForm createdMode={createMode}/>
        default:
            return <p>Form not found!</p>
        
    }
}