import { CreateEditForm } from "./CreateEditForm"
import {getNegotations, postCreateNegotation, putEditNegotation} from "../../api/green_wheels.api";

export const NegotationForm = ({createdMode, sellerId}) => {

  const attributes = ['last_modification_date', 'final_sale_price', 'pay_method', 'description'];

  const passParameterToGet = () => {
    return getNegotations(sellerId);
  }

  return (<CreateEditForm
    createdMode={createdMode}
    attributes={attributes}
    getItems = {passParameterToGet}
    postItem = {postCreateNegotation}
    putItem = {putEditNegotation}
    deleteItem = {null}
    searchBy={['id']}
    showResults={['id']}
    />);


}