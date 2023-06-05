import { postRegisterForm } from '../api/green_wheels.api';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { postLoginForm } from "../api/green_wheels.api";
import * as Yup from 'yup';
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { BasicPersonForm } from './forms/BasicPersonForm'
import Navbar from "../components/Navs/navbar"
import Footer from "../components/content/footer"

import myImage from '../Frontend/Media/img.png';

export const PersonRegisterForm = () => {

    /*  Para borrar despues*/

    const Navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    async function submitForm(e) {
        e.preventDefault();
        try {
            const response = await postLoginForm({
                person_id: id,
                password: password,
            });

            if (response.status === 200) {
                console.log("La operación fue un exito");
                Navigate("/");
            } else {
                console.log("La operación fracasó");
            }
        } catch (error) {
            setId("");
            setPassword("");
            console.log("La operación fracaso");
        }
    }
    /**/

    const initialValues = {
        id: '',
        id_type: '1',
        names: '',
        last_names: '',
        living_address: '',
        birth_date: '2023-05-02',
        phone1: '',
        phone2: '',
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        id: Yup.string().required('Id is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const data = {
                person_id: values.id,
                id_type: values.id_type,
                names: values.names,
                last_names: values.last_names,
                living_address: values.living_address,
                birth_date: values.birth_date,
                phone1: values.phone1,
                phone2: values.phone2,
                email: values.email,
                password: values.password
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
        <div className=''>
            <Navbar />
            <div className='contenedorGeneral'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className='formulario'>
                    <BasicPersonForm initialValues={initialValues} exceptFields={['id_type', 'birth_date', 'password']} />
                    <button type="submit">Submit</button>
                </Form>

            </Formik>

            <div className="containerFull">
                <div className="containerlog">
                    <form action="" className="form" onSubmit={submitForm}>
                        <h1>Registro</h1>
                        <input
                            type="number"
                            placeholder="ID"
                            className="box"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="box"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Apellidos"
                            className="box"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Dirección"
                            className="box"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Telefono 1"
                            className="box"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Telefono 2"
                            className="box"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Correo"
                            className="box"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Fecha de nacimiento"
                            className="box"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input type="password" name="password" className="box" placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>

                        <input type="submit" values="Iniciar Sesión" id="submit"></input>
                        <a href="#"> ¿Olvidaste tu contraseña?</a>
                    </form>
                    <div class="side">
                        <img src={myImage} alt=""></img>
                    </div>
                </div>
            </div>

            </div>
            <Footer />
        </div>
    );
}