import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { postRegisterForm } from '../../api/green_wheels.api';

export const CreateSeller = () => {

    const initialValues= {
        id:'',
        id_type:'1',
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

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const data = {
                person_id:values.id,
                id_type:values.id_type,
                names:values.names,
                last_names:values.last_names,
                living_address:values.living_address,
                birth_date:values.birth_date,
                phone1:values.phone1,
                phone2:values.phone2,
                email:values.email,
                password:values.password
            };
            
            const response = await postRegisterForm(data);

            if (response.status >= 200 && response.status <= 299) {
                console.log('Succeful registration');
                resetForm();
            } else {
                console.log("An error has ocurred");
            }
            
        } catch (error) {
            console.log("An error has ocurred");
        }
        
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
                <Form className='formulario'>
                    {generateFormFields(/*Ignored fields: */['id_type', 'birth_date', 'password'])} 
                    <div>
                        <label htmlFor="id_type">Select an option:</label>
                        <Field as="select" id="id_type" name="id_type">
                            <option value="1">National ID</option>
                            <option value="2">International ID</option>            
                        </Field>
                        <ErrorMessage name="id_type" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="birth_date">birth_date</label>
                        <Field name="birth_date">
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
                    <div>
                        <label htmlFor="password">password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" className="error" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}