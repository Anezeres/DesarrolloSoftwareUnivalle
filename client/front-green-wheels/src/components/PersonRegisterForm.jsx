import { postRegisterForm } from '../api/green_wheels.api';
import { useNavigate } from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import {BasicPersonForm} from './forms/BasicPersonForm'

export const PersonRegisterForm = () => {

    const Navigate = useNavigate();

    const initialValues= {
        id:'',
        id_type:'1',
        names:'',
        last_names:'',
        living_address:'',
        birth_date: '2023-05-02',
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
                console.log('Successful registration');
                Navigate('/');
            } else {
                console.log("An error has ocurred");
            }

        } catch (error) {
            console.log("An error has ocurred");
        }

    };

    return (
        <div className="heading">
            <h2 >Registration Form</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className='formulario'>
                    <BasicPersonForm initialValues={initialValues} exceptFields={['id_type', 'birth_date', 'password']}/>
                    <button className='submit'>Submit</button>
                </Form>

            </Formik>
        </div>
    );
}