import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { postEmailForm } from '../../api/green_wheels.api';
import {BasicSchema} from '../../schemas/validaciones'
import '@coreui/coreui/dist/css/coreui.min.css';

export const EmailForm = () =>{

    const [mensaje_exitoso, setMensaje_exitoso] = useState(false)

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
                            // value={correos_destinatarios2}
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
		</div>
    );
}

