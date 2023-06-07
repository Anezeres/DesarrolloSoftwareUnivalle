import { useState, useEffect } from "react";
import { Formik, Form, Field} from "formik";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { BrandForm } from "../forms/BrandForm";
import { VehicleModelForm } from "../forms/VehicleModelForm";
import { VehicleForm } from "../forms/VehicleForm";

export const CreateVehicleComponents = () => {
    
    const [createMode, setCreateMode] = useState(false);

    const [selectedOption, setSelectOptions] = useState('');

    const [renderForm, setRenderForm] = useState(null);

    const selectOptionList = ['Brand', 'Vehicle_Model', 'Vehicle'];

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
        switch (selectedOption) {
            case 'Brand':
                setRenderForm(<BrandForm createdMode={createMode}/>)
                break;
            case 'Vehicle_Model':
                setRenderForm(<VehicleModelForm createdMode={createMode}/>)
                break;
            case 'Vehicle':
                setRenderForm(<VehicleForm createdMode={createMode}/>)
                break;
            default:
                setRenderForm(<p>Form not found!</p>)
                break;
          }
    
        //setSelectOptions(selectOptionList.map(option => {raw_name:option, name:{'Gw_'+option}}   ))
    }, [selectedOption, createMode]);

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