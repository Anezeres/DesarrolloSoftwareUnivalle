import { CreateEditForm } from "./CreateEditForm"
import { getEmployeesTypeList, createNewWorkshopboss, putEditPerson} from "../../api/green_wheels.api";

export const ManageWorkShopBossForm = ({createdMode}) => {

    const attributes = ['person_id','id_type', 'names', 'last_names', 'email',
    'birth_date', 'phone1', 'phone2', 'living_address', 'password'];


    const getAuxFunction = () => {
        return getEmployeesTypeList(2);
    }

    const putAuxFunction = (_, data) => {
        return putEditPerson(data);
    }


    return (<CreateEditForm 
        createdMode={createdMode} 
        attributes={attributes}
        getItems = {getAuxFunction}
        postItem = {createNewWorkshopboss}
        putItem = {putAuxFunction}
        deleteItem = {null}
        searchBy={['person_id', 'names', 'last_names']}
        showResults={['person_id', 'names', 'last_names']}
        />);
}
