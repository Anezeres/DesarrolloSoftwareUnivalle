import {Field, ErrorMessage, Formik, Form} from 'formik'
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import {postRegisterForm} from '../../api/green_wheels.api';
import { BasicPersonForm } from '../forms/BasicPersonForm';
import {useState} from 'react';

export const CreateUserInGroup = ({postCreateUser, groupName}) => {

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

    const userFormInitialValues = {person_id:''};

    const userFormValidationSchema = Yup.object({person_id: Yup.string().required('Id is required')});

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
                    const resUser = await postCreateUser(personId);

                    if (resUser.status>=200 && resUser.status <= 299){
                        console.log("Success");
                    } else {
                        console.log("It looks like it already exists a person with that id in this group");
                    }

                } catch (error) {
                    console.log("An error has ocurred")
                }
                resetForm();
            } else {
                console.log("An error has ocurred");
            }

        } catch (error) {
            console.log("An error has ocurred");
        }

    };

    const userFormHandleSubmit = async (values, {resetForm}) => {
        try {
            const personId = {id:values.person_id};
            const resUser = await postCreateUser(personId);

            if (resUser.status>=200 && resUser.status <= 299){
                console.log("Success");
            } else {
                console.log("It looks like it already exists a person with that id in this group");
            }

        } catch (error) {
            console.log("An error ha ocurred")
        }
        resetForm();
    }


    const handleCheckboxChange = (event) => {
        setToggleMode(event.target.checked);
    };

    return (
        <div>
            <div>
                <label htmlFor="checkbox">Asignar persona existente al grupo de {groupName}</label>
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={toggleMode}
                    onChange={handleCheckboxChange}
                />
            </div>
            {toggleMode ?
            <>
                <h1>Asignar Persona a Grupo de {groupName}</h1>
                <Formik
                    initialValues={userFormInitialValues}
                    validationSchema={userFormValidationSchema}
                    onSubmit={userFormHandleSubmit}>
                    <Form className='formulario'>
                        <div>
                            <label htmlFor="person_id">Enter the person's id </label>
                            <Field type="txt" id="person_id" name="person_id"/>
                            <ErrorMessage name="person_id" component="div" className="error" />
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </>
            :
            <>
                <h1>Crear Nueva Persona</h1>
                <p>La persona creada se registrará automáticamente al grupo de {groupName}</p>
                <Formik
                    initialValues={personFormInitialValues}
                    validationSchema={personFormValidationSchema}
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