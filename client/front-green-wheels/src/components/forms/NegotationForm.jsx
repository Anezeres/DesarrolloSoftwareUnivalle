import { CreateEditForm } from "./CreateEditForm"
import {getNegotations, postCreateNegotation, putEditNegotation} from "../../api/green_wheels.api";

export const NegotationForm = ({createdMode}) => {

  const attributes = ['last_modification_date', 'final_sale_price', 'pay_method', 'description'];

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    getItems = {getNegotations}
    postItem = {postCreateNegotation}
    putItem = {putEditNegotation}
    deleteItem = {null}
    searchBy={['id']}
    showResults={['id']}
    />);


}