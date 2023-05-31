import { postRegisterForm } from '../api/green_wheels.api';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const PersonRegisterForm = () => {
 
    const Navigate = useNavigate();

    const [id, setId] = useState('');  
    const [id_type, set_id_type] = useState('');
    const [names, setNames] = useState('');
    const [lastNames, setLastNames] = useState('');
    const [living_address, set_living_address] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   async function submitForm(e) {
        e.preventDefault();
        try {
                const response = await postRegisterForm({
                        person_id: id,
                        id_type: id_type,
                        names: names,
                        last_names: lastNames,
                        email: email,
                        living_address: living_address,
                        password: password
                });

                
                if (response.status>=200 && response.status <= 299)
                {
                        console.log("La operación fue un exito");
                        Navigate('/');
                } else {
                        console.log("La operación no se logró");
                }
        }
        catch (error) {
                console.error(error);
        }
   }

    return (<div>
        <h2>Registration Form</h2>
        <form className='formulario' onSubmit={submitForm}>
        <input type="number" placeholder="ID" value={id} 
                onChange={(e)=>setId(e.target.value)}/>
        <input type="text" placeholder="Enter your Id type" value={id_type} 
                onChange={(e)=>set_id_type(e.target.value)}/>
        <input type="text" placeholder="Enter your names" value={names} 
                onChange={(e)=>setNames(e.target.value)}/>
        <input type="text" placeholder="Enter your lastnames" value={lastNames} 
                onChange={(e)=>setLastNames(e.target.value)}/>
        <input type="email" placeholder="Enter your email address" value={email} 
                onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder="Enter your living address" value={living_address} 
                onChange={(e)=>set_living_address(e.target.value)}/>     
        <input type="password" placeholder="Enter your password" value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
        </form>
    </div>)
}