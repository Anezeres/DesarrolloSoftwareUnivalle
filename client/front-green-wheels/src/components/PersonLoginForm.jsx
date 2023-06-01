import intervalToDuration from 'date-fns/intervalToDuration/index.js';
import { postLoginForm } from '../api/green_wheels.api';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import myImage from '../pages/Media/img.png';
import Navbar  from "../components/Navs/navbar";


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

    return (
    
    <div>
        <Navbar/>
        
        {/* <h2>Login Form</h2>
        <form className='formulario' onSubmit={submitForm}>
        <input type="number" placeholder="ID" value={id} 
                onChange={(e)=>setId(e.target.value)}/>
        <input type="password" placeholder="Enter your password" value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
        </form> */}

        <div>
        <div className = "containerFull">
        <div className = "containerlog">
            <form action = "" className = "form" onSubmit={submitForm}>
                <h1>Inicia Sesión</h1>
                <input type="number" placeholder="ID" className = "box" value={id} 
                onChange={(e)=>setId(e.target.value)}/>
                <input type = "password" name = "password" className = "box" placeholder = "Contraseña" value={password} 
                onChange={(e)=>setPassword(e.target.value)}></input>
                <input type = "submit" values = "Iniciar Sesión" id = "submit"></input>
                <a href = "#"> ¿Olvidaste tu contraseña?</a>
            </form>
            <div class = "side">
                <img src = {myImage} alt = ""></img>
            </div>
        </div>
        </div>
        
        </div>

        
    </div>)
}