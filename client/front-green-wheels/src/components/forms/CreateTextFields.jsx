import {Field, ErrorMessage} from "formik";

export const createTextFields = (fields) => {
    return fields.map((field, index) => 
        <div key={index}>
            <label htmlFor={field}>{field}</label>
            <Field  
            type="text" 
            id={field}
            name={field}
            placeholder={field}
            />
            <ErrorMessage name={field} component='div' className='error'/>
        </div>
    );
}
    