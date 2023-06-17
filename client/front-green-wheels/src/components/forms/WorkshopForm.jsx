import { CreateEditForm } from "./CreateEditForm"
import {getWorkshops, postCreateWorkshop, putEditWorkshop} from "../../api/green_wheels.api";

export const WorkshopForm = ({createdMode}) => {

  const attributes = ['headquarter_id'];

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    getItems = {getWorkshops}
    postItem = {postCreateWorkshop}
    putItem = {putEditWorkshop}
    deleteItem = {null}
    searchBy={['headquarter_id']}
    showResults={['headquarter_id']}
    />);
}