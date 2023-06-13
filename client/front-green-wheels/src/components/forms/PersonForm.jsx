import { CreateEditForm } from "./CreateEditForm"
import { getAllPersons } from "../../api/green_wheels.api";

export const PersonForm = ({createdMode}) => {

    const attributes = ['id_type', 'names', 'last_names', 'email',
    'birth_date', 'phone1', 'phone2', 'living_address'];

    return (<CreateEditForm 
        createdMode={createdMode} 
        attributes={attributes}
        getItems = {getAllPersons}
        postItem = {null}
        putItem = {null}
        deleteItem = {null}
        searchBy={['person_id', 'names', 'last_names']}
        showResults={['person_id', 'names', 'last_names']}
        />);
}
