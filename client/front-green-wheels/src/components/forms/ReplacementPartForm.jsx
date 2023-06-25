import { CreateEditForm } from "./CreateEditForm"
import { getReplacementsParts, postCreateReplacement, putEditReplacement } from "../../api/green_wheels.api";


export const ReplacementPartForm = ({createdMode}) => {
const attributes = ['name', 'description', 'model_id'];

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    getItems = {getReplacementsParts}
    postItem = {postCreateReplacement}
    putItem = {putEditReplacement}
    deleteItem = {null}
    searchBy={['name', 'model_id']}
    showResults={['name', 'model_id']}
    />);
}