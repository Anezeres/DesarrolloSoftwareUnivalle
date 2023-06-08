import { CreateEditForm } from "./CreateEditForm"

export const PersonForm = ({createdMode}) => {

    const attributes = ['id_type', 'names', 'last_names', 'email',
    'birth_date', 'phone1', 'phone2', 'living_address'];

    return (<CreateEditForm 
        createdMode={createdMode} 
        attributes={attributes}
        getItems = {null}
        postItem = {null}
        putItem = {null}
        deleteItem = {null}
        />);
}
