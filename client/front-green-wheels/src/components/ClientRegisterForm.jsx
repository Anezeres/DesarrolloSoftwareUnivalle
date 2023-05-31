import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { postRegisterClientForm } from '../api/green_wheels.api';
import {BasicSchema} from '../schemas/validacionesClient'
import '@coreui/coreui/dist/css/coreui.min.css';

export const ClientForm = () =>{

    const [mensaje_exitoso, setMensaje_exitoso] = useState(false)
    const idTypeOptions = [
        { value: '1', label: 'Identificación Nacional' },
        { value: '2', label: 'Identificación Internacional' },
      ];

    return (
        <div>
            <h2>Registration Client</h2>
            <Formik 
            initialValues={{
                person_id: 0,
                id_type: '',
                names: '',
                last_names: '',
                email: '',
                living_address: '',
                phone1:'',
                phone2:'',
                birth_date:'2023-05-02',
                password: ''
            }}
            validationSchema={BasicSchema}
            onSubmit={ async (valores, {resetForm})=>{
                try{
                    const response = await postRegisterClientForm({
                        person_id: valores.person_id,
                        id_type: valores.id_type,
                        names: valores.names,
                        last_names: valores.last_names,
                        email: valores.email,
                        living_address: valores.living_address,
                        phone1:valores.phone1,
                        phone2:valores.phone2,
                        birth_date: valores.birth_date,
                        password: valores.password,
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
                            <label htmlFor="person_id">Identificación</label>
                            <Field  
                            type="number" 
                            id='person_id' 
                            name='person_id' 
                            placeholder="Escribe tu número de identificación"
                            />
                            <ErrorMessage name='person_id' component='div' className='error'/>
                        </div>
                        <div>
                            <label htmlFor="id_type">Tipo de identificación</label>
                            <Field 
                            as="select" 
                            id="id_type" 
                            name="id_type" 
                            placeholder="Elige tu tipo de identificación">
                                <option value="">Seleccionar tipo de identificación</option>
                                {idTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_type" component="div" className="error" />
                        </div>
                        <div>
                            <label htmlFor="names">Nombres</label>
                            <Field  
                            type="text" 
                            id='names' 
                            name='names' 
                            placeholder="Escribe tus nombre(s)"
                            />
                            <ErrorMessage name='names' component='div' className='error'/>
                        </div>
                        <div>
                            <label htmlFor="last_names">Apellidos</label>
                            <Field  
                            type="text" 
                            id='last_names' 
                            name='last_names' 
                            placeholder="Escribe tus apellido(s)"
                            />
                            <ErrorMessage name='last_names' component='div' className='error'/>
                        </div>
                        <div>
                            <label htmlFor="email">Correo</label>
                            <Field 
                            type="email" 
                            id='email' 
                            name='email' 
                            placeholder="Ingrese su correo" 
                            />
                            <ErrorMessage name='email' component='div' className='error'/>
                        </div>
                        <div>
                            <label htmlFor="phone1">Phone 1</label>
                            <Field type="txt" id="phone1" name="phone1"/>
                            <ErrorMessage name="id_type" component="div" className="error" />
                        </div>
                        
                        <div>
                            <label htmlFor="phone2">Phone 2</label>
                            <Field type="txt" id="phone2" name="phone2"/>
                            <ErrorMessage name="id_type" component="div" className="error" />
                        </div>
                        <div>
                            <label htmlFor="living_address">Dirección</label>
                            <Field  
                            type="text" 
                            id='living_address' 
                            name='living_address' 
                            placeholder="Escribe tu dirección"
                            />
                            <ErrorMessage name='living_address' component='div' className='error'/>
                        </div>
                        <div>
                            <label htmlFor="birth_date">Fecha de nacimiento</label>
                            <Field  
                            type="birth_date" 
                            id='birth_date' 
                            name='birth_date' 
                            placeholder="Escribe tu dirección"
                            />
                            <ErrorMessage name='birth_date' component='div' className='error'/>
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <Field  
                            type="password" 
                            id='password' 
                            name='password' 
                            placeholder="Escribe tu contraseña"
                            />
                            <ErrorMessage name='password' component='div' className='error'/>
                        </div>
                        <button type="submit">Enviar</button>
                        {mensaje_exitoso && <p className='exito'>Formulario enviado con éxito!</p>}
                    </Form>
                )}    
            </Formik>           
		</div>
    );
}

