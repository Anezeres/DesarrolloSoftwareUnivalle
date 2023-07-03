import { CreateEditForm } from "./CreateEditForm"
import {getHeadquarters, getConcessionaires, postCreateConcessionaire, putEditConcessionaire} from "../../api/green_wheels.api";
import { useState, useEffect } from "react";

export const ConcessionaireForm = ({createdMode}) => {

  const attributes = ['headquarter_id'];

  const [headquarters, setHeadquarters] = useState([]);

  useEffect(() => {
    async function makeRequest () {
        try {
            const response = await getHeadquarters();
            if (response.status >= 200 && response.status <= 299) {
                const newHeadquarters = response.data.map((e,i)=>{
                    e["field"] = "headquarter_id";
                    e["inputValue"] = "id";
                    return e;
                });
                setHeadquarters(newHeadquarters);
            } else {
                console.log("Ha ocurrido un error")
            }
        } catch (error) {
            console.log(error);
        }}
        makeRequest();
  }, []);

  return (<CreateEditForm 
    createdMode={createdMode} 
    attributes={attributes}
    disableAttributes={['headquarter_id']}
    getItems = {getConcessionaires}
    postItem = {postCreateConcessionaire}
    putItem = {putEditConcessionaire}
    deleteItem = {null}
    searchBy={['headquarter_id']}
    showResults={['headquarter_id']}
    autocompleteInputs={[
    {
          label:"headquarter_id",
          options:headquarters,
          searchKeys:["name"],
          showKey:"name",
    }
  ]}
    />);
}