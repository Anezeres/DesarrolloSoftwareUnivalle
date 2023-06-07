import { postLoginForm } from '../api/green_wheels.api';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const PersonLoginForm = () => {

    const Navigate = useNavigate();

    const [id, setId] = useState('');  
    const [password, setPassword] = useState('');

   async function submitForm(e) {
        e.preventDefault();
        try {
                const response = await postLoginForm({
                        person_id: id,
                        password: password
                });

                if (response.status===200)
                {
                    console.log("La operación fue un exito");
                    Navigate('/');
                } else {
                    
                    console.log("La operación fracasó");
                }
        }
        catch (error) {
            setId('');
            setPassword('');
            console.log("La operación fracaso");
        }
   }

    return (<div>
        <h2>Login Form</h2>
        <form onSubmit={submitForm}>
        <input type="number" placeholder="ID" value={id} 
                onChange={(e)=>setId(e.target.value)}/>
        <input type="password" placeholder="Contraseña" value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Iniciar Sesión</button>
        </form>
    </div>)
}