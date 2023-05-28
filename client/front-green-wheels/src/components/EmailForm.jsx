import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'

export const EmailForm = () =>{

    const [mensaje_exitoso, setMensaje_exitoso] = useState(false)

    return (
        <>
            <Formik
            initialValues={{
                correo_remitente:'',
                correo_destinatario: '',
                asunto: '',
                mensaje:''

            }}
            validate={(valores)=>{
                let errors = {}

                if (valores.correo_remitente == ''){
                    errors.correo_remitente = 'Por favor ingresa un correo válido'
                }//Poner expresión regular e implementarlo con yup
                if (valores.correo_destinatario == ''){
                    errors.correo_destinatario = 'Por favor ingresa un correo válido'
                }

                return errors
            }}
            onSubmit={(valores, {resetForm})=>{
                // Logic to send data to backend
                

                resetForm();
                setMensaje_exitoso(true)
                setTimeout( ()=>{
                    setMensaje_exitoso(false)
                }, 4000 )
            }}
            >
                {( {errors} ) => (
                    <Form className="formulario">
                        <div>
                            <label htmlFor="correo_remitente">Correo remitente</label>
                            <Field 
                            type="email" 
                            id='correo_remitente' 
                            name='correo_remitente' 
                            placeholder="Ingrese su correo" 
                            />
                            <ErrorMessage name='correo_remitente' component={ ()=>(
                                <div className='error'>{errors.correo_remitente}</div>
                            ) }/>
                        </div>
                        <div>
                            <label htmlFor="correo_destinatario">Correo destinatario</label>
                            <Field 
                            type="email" 
                            id='correo_destinatario' 
                            name='correo_destinatario' 
                            placeholder="Ingrese el correo a quien va dirigido" 
                            />
                            <ErrorMessage name='correo_destinatario' component={ ()=>(
                                <div className='error'>{errors.correo_destinatario}</div>
                            ) }/>
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
                            type="text" 
                            id='mensaje' 
                            name='mensaje' 
                            placeholder="Escribe el mensaje" 
                            />
                        </div>
                        <button type="submit">Enviar</button>
                        {mensaje_exitoso && <p className='exito'>Formulario enviado con éxito!</p>}
                    </Form>
                )}    
            </Formik>
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
		</>
    );
}