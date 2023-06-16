import {Formik, Form} from "formik";
import { createTextFields } from "./CreateTextFields";
import {useState, useEffect} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


export const CreateEditForm = ({createdMode, attributes, getItems, postItem, putItem, deleteItem, searchBy, showResults}) => {

    const [items, setItems] = useState([]);

    const [selectedItem, setSelectedItem] = useState(false);

    const initialValues = attributes.reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, {});

    const handleOnSelect = (item) => {
      setSelectedItem(false);
      setSelectedItem(item);
    }

    const formatResult = (item) => {
      const filteredObject = Object.keys(item).reduce((acc, key) => {
        if (showResults.includes(key)) {
          acc[key] = item[key];
        }
        return acc;
      }, {});

      const fields = Object.values(filteredObject).join('-');

      return (
        <>
          <span style={{ display: 'block', textAlign: 'left' }}>{fields}</span>
        </>
      )
    }

    const handleEdit = async (values, { resetForm }) => {
        try {
          const response = await putItem(values.id, values);
          if (response.status >= 200 && response.status <= 299){
            console.log("Edicion correcta");
            resetForm();
            setSelectedItem(false);
            async function getBrandsRequest () {
              try {
                  const response = await getItems();
                  setItems(response.data);
                  setSelectedItem(false);
              } catch (error) {
                  console.log(error);
              }  
          }
          getBrandsRequest();
          } else {
            console.log("Edicion incorrecta")
          }
        } catch (error) {
          console.log(error);
          console.log("Ha ocurrido un error");
        }
    }

    const handlePost = async (values, {resetForm}) => {
      console.log(values)
      try {
        const response = await postItem(values);
        console.log(values)
        if (response.status >= 200 && response.status <= 299) {
            console.log("Creacion Correcta");
            resetForm();
        } else {
          console.log("Creacion incorrecta");
        }
      } catch (error) {
          console.log("Ha ocurrido un error");
      }
    }

    useEffect(()=> {
        async function getItemsRequest () {
            try {
                const response = await getItems();
                setItems(response.data);
                setSelectedItem(false);
            } catch (error) {
                console.log(error);
            }  
        }
        getItemsRequest();
    }, [getItems, setItems]);

    useEffect(()=>{
      setSelectedItem(false);
    }, [createdMode]);

    return (<>
            {!createdMode ? (
            <>
                
                {selectedItem ?
                <>
                <button onClick={()=>{setSelectedItem(false)}}>Choose another</button>
                <Formik initialValues={selectedItem} onSubmit={handleEdit}> 
                  <Form className='formulario'>
                      {createTextFields(attributes)}
                      <button type="submit">Submit</button>
                  </Form>
                </Formik> </>:
            <><ReactSearchAutocomplete
            items={items}
            onSearch={()=>{}}
            onHover={()=>{}}
            onSelect={handleOnSelect}
            onFocus={()=>{}}
            autoFocus
            formatResult={formatResult}
            fuseOptions={{ keys: searchBy }}
        /></>}
            </>
            ) : 
            (<><Formik initialValues={initialValues} onSubmit={handlePost}> 
              <Form className='formulario'>
                  {createTextFields(attributes)}
                  <button type="submit">Submit</button>
              </Form>
          </Formik></>)}
            
            
        </>
    );
}