
import { CreateEditForm } from "./CreateEditForm"
import {getManagers, createNewManager, putEditPerson} from "../../api/green_wheels.api";

export const ManageAdminsForm = ({createdMode}) => {

    const attributes = ['person_id','id_type', 'names', 'last_names', 'email',
    'birth_date', 'phone1', 'phone2', 'living_address', 'password'];

    const putAuxFunction = (_, data) => {
        return putEditPerson(data);
    }

    return (<CreateEditForm 
        createdMode={createdMode} 
        attributes={attributes}
        getItems = {getManagers}
        postItem = {createNewManager}
        putItem = {putAuxFunction}
        deleteItem = {null}
        searchBy={['person_id', 'names', 'last_names']}
        showResults={['person_id', 'names', 'last_names']}
        />);
}
