import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveManageUsersAsAdminFor } from "../retrievers/RetrieveManageUsersAsAdminForm";


export const ManageUsersAsAdmin = () => {
    return <AbstractCreateEditPanel selectOptionList={['Manager']} 
    retriever = {RetrieveManageUsersAsAdminFor}/>
}