import { useState, useEffect, createElement  } from "react";
import { Formik, Form, Field} from "formik";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export const AbstractCreateEditPanel = ({selectOptionList, retriever}) => {
    
    const [createMode, setCreateMode] = useState(false);

    const [selectedOption, setSelectOptions] = useState('');

    const [renderForm, setRenderForm] = useState(null);

    const selectOptionJson = selectOptionList.map(item => ({name:item.replace(new RegExp('_', 'g'), ' '), raw_name:item}));

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setCreateMode(isChecked);

    }

      const handleOnSearch = (string, results) => {
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        setSelectOptions(item.raw_name);
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
        return (
          <div className="result-wrapper" key={item.id}>
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
          </div>
        )
      }

      
    useEffect(()=>{
        setRenderForm(retriever(selectedOption, createMode));
    }, [selectedOption, createMode, retriever]);

    return <>
        <Formik initialValues = {{}}>
            <Form className='formulario'>
                <ReactSearchAutocomplete
                    items={selectOptionJson}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                />
                <div>
                    <label htmlFor="create_mode_checkbox">CREAR NUEVO</label>
                    <Field name="create_mode_checkbox" 
                    type="checkbox"
                    checked={createMode}
                    onChange={handleCheckboxChange} />
                </div>
                    
            </Form>
        </Formik>
         
         <div>
            
            {createMode ? (<>
            <h2>Crear {selectedOption}</h2>
            {renderForm}</>)
            :
            (<><h2>Editar {selectedOption}</h2>
            {renderForm}
            </>)}
            
         </div>
        

        
    </>
}