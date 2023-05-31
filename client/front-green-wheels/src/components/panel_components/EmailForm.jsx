import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { postEmailForm } from '../../api/green_wheels.api';
import {BasicSchema} from '../../schemas/validaciones'
import { CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import axios from 'axios';

export const EmailForm = () =>{

    const [mensaje_exitoso, setMensaje_exitoso] = useState(false)
    const [correos_destinatarios2, setCorreosDestinatarios] = useState('');

    const enviarTodos = (url) => {
        axios.get(url)
          .then(response => {
            const correosDestinatarios = [];
            response.data.forEach(item => {
                const correo = item[0];
                correosDestinatarios.push(correo);
              });
              setCorreosDestinatarios(correosDestinatarios.join(', '));
          })
          .catch(error => {
            console.error(error);
          });
      };

        const enviarEmpleadoEspecifico = (url,grupo) => {
            axios.get(url)
            .then(response => {
                const correosDestinatarios = [];
                response.data.forEach(item => {
                    const correo = item[0];
                    const grupos = item[1];
                    if (grupos.includes(grupo)) {
                    correosDestinatarios.push(correo);
                    }
                });
                setCorreosDestinatarios(correosDestinatarios.join(', '));
            })
            .catch(error => {
                console.error(error);
            });
        };

    return (
        <div className='d-flex justify-content-end'>
            <Formik 
            initialValues={{
                correo_destinatario: '',
                asunto: '',
                mensaje:''
            }}
            validationSchema={BasicSchema}
            onSubmit={ async (valores, {resetForm})=>{
                try{
                    const response = await postEmailForm({
                        correo_destinatario:valores.correo_destinatario,
                        asunto: valores.asunto,
                        mensaje:valores.mensaje
                    })
                    console.log(response)
                    if (response.status>=200 && response.status <= 299){
                        console.log("La operación fue un exito");
                    } else {
                        console.log("La operación no se logró");
                    }

                    // logic for form
                    resetForm();
                    setMensaje_exitoso(true)
                    setTimeout( ()=>{
                        setMensaje_exitoso(false)
                    }, 4000 )

                } catch (error) {
                    console.error(error);
                }

            }}
            // handleChange = { (values)=>{
                
            // } }
            >
                { () => (
                    <Form className="formulario">
                        <div>
                            <label htmlFor="correo_destinatario">Correo destinatario</label>
                            <Field 
                            type="email" 
                            id='correo_destinatario' 
                            name='correo_destinatario' 
                            placeholder="Ingrese el correo a quien va dirigido" 
                            value={correos_destinatarios2}
                            multiple
                            />
                            <ErrorMessage name='correo_destinatario' component='div' className='error'/>
                        </div>
                        <div>
                            <label htmlFor="asunto">Asunto</label>
                            <Field
                            type="text" 
                            id='asunto' 
                            name='asunto' 
                            placeholder="Ingrese el asunto" 
                            />
                        </div>
                        <div>
                            <label htmlFor="mensaje">Mensaje</label>
                            <Field
                            as="textarea"
                            style={{ resize: 'none', height: '150px' }} 
                            type="text" 
                            id='mensaje' 
                            name='mensaje' 
                            placeholder="Escribe el mensaje"
                            />
                            <ErrorMessage name='mensaje' component='div' className='error'/>
                        </div>
                        <button type="submit">Enviar</button>
                        {mensaje_exitoso && <p className='exito'>Formulario enviado con éxito!</p>}
                    </Form>
                )}    
            </Formik>
            <div className="mx-auto">
                <CButton color="primary" onClick={() => enviarTodos('http://localhost:8000/get_employees_email')}>Todos</CButton>
                <CButton color="primary" onClick={() => enviarEmpleadoEspecifico('http://localhost:8000/get_employees_email',3)}>Jefes de taller</CButton> 
                <CButton color="primary" onClick={() => enviarEmpleadoEspecifico('http://localhost:8000/get_employees_email',2)}>Vendedores</CButton> 
            </div>            
		</div>
    );
}

{/* touched detecta cuando se ha tocado un input, su valor cambia a True */}
                {/* {( {values, errors, touched, handleSubmit, handleChange, handleBlur} ) => (
                    <form className="formulario" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="correo_remitente">Correo remitente</label>
                            <input 
                            type="email" 
                            id='correo_remitente' 
                            name='correo_remitente' 
                            placeholder="Ingrese su correo" 
                            value={values.correo_remitente}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {touched.correo_remitente && errors.correo_remitente && <div className='error'>{errors.correo_remitente}</div>}
                        </div>
                        <div>
                            <label htmlFor="correo_destinatario">Correo destinatario</label>
                            <input 
                            type="email" 
                            id='correo_destinatario' 
                            name='correo_destinatario' 
                            placeholder="Ingrese el correo a quien va dirigido" 
                            value={values.correo_destinatario}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {touched.correo_destinatario && errors.correo_destinatario && <div className='error'>{errors.correo_destinatario}</div>}
                        </div>
                        <div>
                            <label htmlFor="asunto">Asunto</label>
                            <input 
                            type="text" 
                            id='asunto' 
                            name='asunto' 
                            placeholder="Ingrese el asunto" 
                            value={values.asunto}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                        </div>
                        <div>
                            <label htmlFor="mensaje">Mensaje</label>
                            <textarea 
                            type="text" 
                            id='mensaje' 
                            name='mensaje' 
                            placeholder="Escribe el mensaje" 
                            value={values.mensaje}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                        </div>
                        <button type="submit">Enviar</button>
                        {mensaje_exitoso && <p className='exito'>Formulario enviado con éxito!</p>}
                    </form> 
                )} */}