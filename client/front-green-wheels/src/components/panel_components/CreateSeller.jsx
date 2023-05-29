import {Formik, Form} from 'formik'
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import {postRegisterForm ,postCreateClient, postCreateSeller } from '../../api/green_wheels.api';
import { BasicPersonForm } from '../forms/BasicPersonForm';
import {useState} from 'react';

export const CreateSeller = () => {

    const [toggleMode, setToggleMode] = useState(false);

    const personFormInitialValues= {
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

    const personFormValidationSchema = Yup.object({
        id: Yup.string().required('Id is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const sellerFormInitialValues = {id:''};

    const sellerFormValidationSchema = Yup.object({id: Yup.string().required('Id is required')});

    const personFormHandleSubmit = async (values, { resetForm }) => {
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

            const resRegister = await postRegisterForm(data);

            if (resRegister.status >= 200 && resRegister.status <= 299) {
                try {
                    const personId = {id:values.id}
                    const resSeller = await postCreateSeller(personId);

                    if (resSeller.status>=200 && resSeller.status <= 299){
                        console.log("Success");
                    } else {
                        console.log("It looks like it already exists a seller with that person id");
                    }

                } catch (error) {
                    console.log("An error ha ocurred")
                }
                resetForm();
            } else {
                console.log("An error has ocurred");
            }

        } catch (error) {
            console.log("An error has ocurred");
        }

    };

    const sellerFormHandleSubmit = () => {

    }


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
                <Formik initialValues={{id:''}} validationSchema={personFormValidationSchema} onSubmit={sellerFormHandleSubmit}>
                    <Form className='formulario'>
                        <BasicPersonForm pnitialValues={personFormInitialValues} exceptFields={['id_type', 'birth_date', 'password']}/>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </>
            :
            <>
                <h1>Crear Nueva Persona</h1>
                <p>La persona creada se registrará automáticamente al grupo de Vendedores</p>
                <Formik
                personFormInitialValues={{id:''}}
                validationSchema={Yup.object({id: Yup.string().required('Id is required')})}
                onSubmit={personFormHandleSubmit}>
                    <Form className='formulario'>
                        <BasicPersonForm initialValues={personFormInitialValues} exceptFields={['id_type', 'birth_date', 'password']}/>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </>
            }
        </div>
    );
}