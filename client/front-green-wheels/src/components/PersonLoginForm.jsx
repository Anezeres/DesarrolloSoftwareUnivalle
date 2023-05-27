import { postLoginForm } from '../api/green_wheels.api';
import { useState } from 'react';

export const PersonLoginForm = () => {

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
                } else {
                        console.log("La operación fue un exito");
                }
        }
        catch (error) {
                console.error(error);
        }
   }

    return (<div>
        <h2>Login Form</h2>
        <form onSubmit={submitForm}>
        <input type="number" placeholder="ID" value={id} 
                onChange={(e)=>setId(e.target.value)}/>
        <input type="password" placeholder="Enter your password" value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
        </form>
    </div>)
}