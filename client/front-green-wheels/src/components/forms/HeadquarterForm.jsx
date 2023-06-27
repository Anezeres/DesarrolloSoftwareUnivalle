import { CreateEditForm } from "./CreateEditForm"
import {getHeadquarters, postCreateHeadquarter, putEditHeadquarter} from "../../api/green_wheels.api";

export const HeadquarterForm = ({createdMode}) => {

  const attributes = ['name', 'city', 'address'];

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    getItems = {getHeadquarters}
    postItem = {postCreateHeadquarter}
    putItem = {putEditHeadquarter}
    deleteItem = {null}
    searchBy={['name', 'city']}
    showResults={['name', 'city']}
    />);


}