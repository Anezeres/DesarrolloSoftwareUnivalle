import { CreateEditForm } from "./CreateEditForm"
import {getConcessionaires, postCreateConcessionaire, putEditConcessionaire} from "../../api/green_wheels.api";

export const ConcessionaireForm = ({createdMode}) => {

  const attributes = ['headquarter_id'];

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    getItems = {getConcessionaires}
    postItem = {postCreateConcessionaire}
    putItem = {putEditConcessionaire}
    deleteItem = {null}
    searchBy={['headquarter_id']}
    showResults={['headquarter_id']}
    />);
}