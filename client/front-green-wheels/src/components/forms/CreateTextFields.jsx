import {Field, ErrorMessage} from "formik";

export const createTextFields = (fields, disableAttributes=[]) => {
    return fields.map((field, index) => {
     
        const disable = disableAttributes.includes(field);

        return <div key={index}>
                <label htmlFor={field}>{field}</label>
                <Field  
                type="text" 
                id={field}
                name={field}
                placeholder={field}
                disabled={disable}
                />
                <ErrorMessage name={field} component='div' className='error'/>
            </div>
        }
    );
}
    