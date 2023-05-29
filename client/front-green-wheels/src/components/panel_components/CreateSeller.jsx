import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const CreateSeller = () => {

    const initialValues= {
        id:'',
        names:'',
        last_names:'',
        living_address:'',
        birth_date:'',
        phone1:'',
        phone2:'',
        email:'',
        password:''
    }

    const validationSchema = Yup.object({
        id: Yup.string().required('Id is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
    };

    const generateFormFields = (except_list) => {
        return Object.entries(initialValues).map(([fieldName, fieldValue]) => (
            !except_list.includes(fieldName) ? (
                <div key={fieldName}>
                <label htmlFor={fieldName}>{fieldName}</label>
                <Field type="text" id={fieldName} name={fieldName} />
                <ErrorMessage name={fieldName} component="div" className="error" />
                </div>) : null  
          
        ));
      };
    
    
    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    {generateFormFields(/*Ignored fields: */['birth_date'])} 
                    <div>
                        <label htmlFor="birth_date">birth_date</label>
                        <Field name="date">
                            {({ form, field }) => (
                                <DatePicker
                                id="date"
                                selected={field.value}
                                onChange={(value) => form.setFieldValue(field.name, value)}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="birth_date" component="div" className="error" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}