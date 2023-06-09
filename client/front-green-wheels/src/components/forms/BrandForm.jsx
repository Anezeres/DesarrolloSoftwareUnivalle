import { CreateEditForm } from "./CreateEditForm"
import { getBrands, putEditBrand, postCreateBrand} from "../../api/green_wheels.api";

export const BrandForm = ({createdMode}) => {

  const attributes = ['name', 'country'];

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    getItems = {getBrands}
    postItem = {postCreateBrand}
    putItem = {putEditBrand}
    deleteItem = {null}
    searchBy={['name', 'country']}
    showResults={['name', 'country']}
    />);


}