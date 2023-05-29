import {Formik, Form} from 'formik'
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { postRegisterForm } from '../../api/green_wheels.api';
import { BasicPersonForm } from '../forms/BasicPersonForm';
import {useState} from 'react';

export const CreateSeller = () => {

    const [toggleMode, setToggleMode] = useState(false);

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
                resetForm();
            } else {
                console.log("An error has ocurred");
            }

        } catch (error) {
            console.log("An error has ocurred");
        }

    };

    const handleCheckboxChange = (event) => {
        setToggleMode(event.target.checked);
    };

    return (
        <div>
            <div>
                <label htmlFor="checkbox">Asignar persona existente al grupo de Vendedores</label>
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={toggleMode}
                    onChange={handleCheckboxChange}
                />
            </div>
            {toggleMode ?
            <>
                <h1>Asignar Persona a Grupo de Vendedores</h1>
                <p>Menu para asignar una persona al grupo de Vendedores</p>
            </>
            :
            <>
                <h1>Crear Nueva Persona</h1>
                <p>La persona creada se registrará automáticamente al grupo de Vendedores</p>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className='formulario'>
                        <BasicPersonForm initialValues={initialValues} exceptFields={['id_type', 'birth_date', 'password']}/>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </>
            }
        </div>
    );
}