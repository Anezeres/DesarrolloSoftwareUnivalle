import {Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export const BasicPersonForm = ({initialValues, exceptFields}) => {

    const generateFormFields = (exceptFields) => {
        return Object.entries(initialValues).map(([fieldName, fieldValue]) => (
            !exceptFields.includes(fieldName) ? (
                <div key={fieldName}>
                <Field placeholder={fieldName} type="text" id={fieldName} name={fieldName} />
                <ErrorMessage name={fieldName} component="div" className="error" />
                </div>) : null  
          
        ));
      };

    return (
        <div >
            {generateFormFields(/*Ignored fields: */exceptFields)} 
            <div>
                <Field className='input' as="select" id="id_type" name="id_type">
                    <option value="1">National ID</option>
                    <option value="2">International ID</option>            
                </Field>
                <ErrorMessage name="id_type" component="div" className="error" />
            </div>
            <div>
                <label htmlFor="birth_date">birth_date</label>
                <Field className='input' name="birth_date">
                    {({ form, field }) => (
                        <DatePicker
                        id="birth_date"
                        selected={new Date(field.value)}
                        onChange={(value) =>form.setFieldValue(field.name, format(value, 'yyyy-MM-dd'))}
                        />
                    )}
                </Field>
                <ErrorMessage name="birth_date" component="div" className="error" />
            </div>
            <div >
                <Field placeholder="password" type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
            </div>
        </div>
    );
}