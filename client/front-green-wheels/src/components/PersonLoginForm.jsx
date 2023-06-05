import intervalToDuration from "date-fns/intervalToDuration/index.js";
import { postLoginForm } from "../api/green_wheels.api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myImage from '../Frontend/Media/img.png';
import Navbar from "../components/Navs/navbar";

export const PersonLoginForm = () => {
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


  useEffect(() => {
    const inputs = document.querySelectorAll(".input-field");
    const toggle_btn = document.querySelectorAll(".toggle");
    const main = document.querySelector("main");

    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => {
        inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
        if (inp.value !== "") return;
        inp.classList.remove("active");
      });
    });

    toggle_btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
      });
    });
  }, []);

  return (
    <div>
      <Navbar />

      {/* <h2>Login Form</h2>
        <form className='formulario' onSubmit={submitForm}>
        <input type="number" placeholder="ID" value={id} 
                onChange={(e)=>setId(e.target.value)}/>
        <input type="password" placeholder="Enter your password" value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
        </form> */}

      <div>
        <div className="contenedorGeneral">
          <main>
          <div className="box">
                <div className="inner-box">
                    <div className = "forms-wrap">
                        <form action="login.html" autocomplete="off" className = "sign-in-form">
                            <div className = "logo">
                                <img src = "/client/front-green-wheels/src/Frontend/Media/logog.png" alt = "GreenWheels"></img>
                                <h4>GreenWheels</h4>
                            </div>

                            <div className = "heading">
                                <h2>¡Inicia sesión!</h2>
                                <h6> ¿No tienes cuenta?</h6>
                                <a href="#" className="toggle">Regístrate aquí</a>
                            </div>

                            <div className = "actual-form">

                                <div className = "input-wrap">
                                    <input 
                                        type="text" 
                                        minlength="4" 
                                        className="input-field" 
                                        autocomplete="off" 
                                        required
                                    />
                                    <label>Email o usuario</label>
                                </div>

                                <div className="input-wrap">
                                    <input
                                        type="contraseña"
                                        minlength="4"
                                        className="input-field"
                                        autocomplete="off"
                                        required
                                    />
                                    <label>Contraseña</label>
                                </div>


                                <input type = "submit" value = "Iniciar Sesión" className="sign-btn" />
                                <p className = "text">
                                    ¿Olvidaste tu contraseña o usuario?
                                    <a href = "#">Da clic aquí</a>
                                </p>
                            </div>
                        </form>
                        
                        <form action="login.html" autocomplete="off" className = "sign-up-form">
                            <div className = "logo">
                                <img src = "/client/front-green-wheels/src/Frontend/Media/logog.png" alt = "GreenWheels"></img>
                                <h4>GreenWheels</h4>
                            </div>

                            <div className = "heading">
                                <h2>¡Regístrate!</h2>
                                <h6>¿Ya tienes una cuenta?</h6>
                                <a href="#" className="toggle">Inicia sesión</a>
                            </div>

                            <div className = "actual-form">

                                <div className = "input-wrap">
                                    <input 
                                        type="text" 
                                        minlength="4" 
                                        className="input-field" 
                                        autocomplete="off" 
                                        required
                                    />
                                    <label>Usuario</label>
                                </div>

                                <div className = "input-wrap">
                                    <input 
                                        type="email"
                                        className="input-field" 
                                        autocomplete="off" 
                                        required
                                    />
                                    <label>Email</label>
                                </div>

                                <div className="input-wrap">
                                    <input
                                        type="contraseña"
                                        minlength="4"
                                        className="input-field"
                                        autocomplete="off"
                                        required
                                    />
                                    <label>Contraseña</label>
                                </div>


                                <input type = "submit" value = "Regístrate" className="sign-btn" />
                                <p className = "text">
                                    Autorizo el uso de mis datos de acuerdo a la 
                                    <a href = "#"> declaración de privacidad </a>y acepto los 
                                    <a href = "#">terminos y condiciones.</a>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className = "carrousel"></div>
                </div>
            </div>


          </main>   
        </div>
      </div>
    </div>
  );
};
