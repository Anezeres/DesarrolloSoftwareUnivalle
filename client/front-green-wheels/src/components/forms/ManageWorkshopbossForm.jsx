import { CreateEditForm } from "./CreateEditForm"
import { getManageUserManager, createNewWorkshopboss} from "../../api/green_wheels.api";

export const ManageWorkShopBossForm = ({createdMode}) => {

    const attributes = ['person_id','id_type', 'names', 'last_names', 'email',
    'birth_date', 'phone1', 'phone2', 'living_address', 'password'];

    return (<CreateEditForm 
        createdMode={createdMode} 
        attributes={attributes}
        getItems = {getManageUserManager}
        postItem = {createNewWorkshopboss}
        putItem = {null}
        deleteItem = {null}
        searchBy={['person_id', 'names', 'last_names']}
        showResults={['person_id', 'names', 'last_names']}
        />);
}
