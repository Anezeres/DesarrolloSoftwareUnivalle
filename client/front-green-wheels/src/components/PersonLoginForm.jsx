import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { postLoginForm } from '../api/green_wheels.api';
import { postRegisterForm } from '../api/green_wheels.api';
import '../Frontend/login.css';
import carrousel1 from '../Frontend/Media/carrousel1.png';
import carrousel2 from '../Frontend/Media/carrousel2.png';
import carrousel3 from '../Frontend/Media/carrousel3.png';
import logo from '../Frontend/Media/logog.png';



export function PersonLoginForm() {

  const Navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [personId, setPersonId] = useState('');
  const [id, setId] = useState('');  
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [email, setEmail] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [living_address, set_living_address] = useState('');
  const [id_type, set_id_type] = useState('');
  

  async function InicioSesion(a) {
    a.preventDefault();
        try {
                const response = await postLoginForm({
                        person_id: personId,
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
            setPersonId('');
            setPassword('');
            console.log("La operación fracaso");
        }
  }

  const sendToRegistrationPage = () => {
    return Navigate('/register');
  }

    async function registro(b) {
    b.preventDefault();
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

  useEffect(() => {
        const images = document.querySelectorAll(".image");
    const bullets = document.querySelectorAll(".bullets span");
    const inputs = document.querySelectorAll(".input-field");
    const toggle_btn = document.querySelectorAll(".toggle");
    const main = document.querySelector("main");

    let currentIndex = 0;
    let interval;

    function showImage(index) {
      images.forEach((image, i) => {
          image.classList.remove("show");
          bullets[i].classList.remove("active");
      });

      images[index].classList.add("show");
      bullets[index].classList.add("active");
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);

      const textSlider = document.querySelector(".text-group");
      textSlider.style.transform = `translateY(${-(currentIndex) * 2.2}rem)`;
    }

    function startSlider() {
      interval = setInterval(nextImage, 3000);
    }

    function resetSliderInterval() {
      clearInterval(interval);
      startSlider();
    }

    bullets.forEach((bullet, index) => {
      bullet.addEventListener("click", () => {
          currentIndex = index;
          showImage(currentIndex);

          const textSlider = document.querySelector(".text-group");
          textSlider.style.transform = `translateY(${-(currentIndex) * 2.2}rem)`;

          resetSliderInterval();
      });
    });

    startSlider();

    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => {
          inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
          if (inp.value != "") return;
          inp.classList.remove("active");
      });
    });

    toggle_btn.forEach((btn) => {
      btn.addEventListener("click", () => {
          main.classList.toggle("sign-up-mode");
      });
    });

    function moveSlider() {
      let index = this.dataset.value;

      let currentImage = document.querySelector(`.img-${index}`);
      images.forEach((img) => img.classList.remove("show"));
      currentImage.classList.add("show");

      const textSlider = document.querySelector(".text-group");
      textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

      bullets.forEach((bull) => bull.classList.remove("active"));
      this.classList.add("active");

      resetSliderInterval();
    }

    bullets.forEach((bullet) => {
      bullet.addEventListener("click", moveSlider);
    });
  });


  return (
    <main>
        <div className="box">
          <div className="inner-box">
            <div className="forms-wrap">
              <form action="login.html" autoComplete="off" className="sign-in-form">
                <div className="logo">
                  <img src={logo} alt="GreenWheels" />
                  <h4>GreenWheels</h4>
                </div>

                <div className="heading">
                  <h2>¡Inicia sesión!</h2>
                  <h6>¿No tienes cuenta?</h6>
                  <a href="#" className="toggle">Regístrate aquí</a>
                </div>

                <div className="actual-form">
                  <div className="input-wrap">
                      <input
                      type="text"
                      minLength="5"
                      className="input-field"
                      autoComplete="off"
                      value={personId}
                      required
                      onChange={(a)=>setPersonId(a.target.value)}/>
                    <label>Person ID</label>
                  </div>

                  <div className="input-wrap">
                  <input
                    type="password"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    value={password}
                    required
                    onChange={(a)=>setPassword(a.target.value)}
                  />
                  <label>Contraseña</label>
                </div>

                  <input type="submit" value="Iniciar Sesión" className="sign-btn" />
                  <p className="text">
                    ¿Olvidaste tu contraseña o usuario?
                    <a href="#">Da clic aquí</a>
                  </p>
                </div>
              </form>

              <form action="login.html" autoComplete="off" className="sign-up-form">
                <div className="logo">
                  <img src={logo} alt="GreenWheels" />
                  <h4>GreenWheels</h4>
                </div>

                <div className="heading">
                  <h2>¡Regístrate!</h2>
                  <h6>¿Ya tienes una cuenta?</h6>
                  <a href="#" className="toggle">Inicia sesión</a>
                </div>

                <div className="actual-form">
                  <div className="input-wrap">
                    <input
                      type="number"
                      minLength="10"
                      className="input-field"
                      autoComplete="off"
                      value={id}
                      required
                      onChange={(b)=>setId(b.target.value)}/>
                    <label>ID</label>
                  </div>

                  <div className="input-wrap">
                    <input
                      type="text"
                      minLength="10"
                      className="input-field"
                      autoComplete="off"
                      value={names}
                      required
                      onChange={(b)=>setNames(b.target.value)}
                    />
                    <label>Full name</label>
                  </div>

                  <div className="input-wrap">
                    <input
                      type="email"
                      minLength="10"
                      className="input-field"
                      autoComplete="off"
                      value={email}
                      required
                      onChange={(b)=>setEmail(b.target.value)}
                    />
                    <label>Email</label>
                  </div>

                  <div className="input-wrap">
                    <input
                      type="text"
                      minLength="10"
                      className="input-field"
                      autoComplete="off"
                      value={living_address}
                      required
                      onChange={(b)=>set_living_address(b.target.value)}
                    />
                    <label>Living adress</label>
                  </div>

                  <div className="input-wrap">
                    <input
                      type="password"
                      minLength="8"
                      className="input-field"
                      autoComplete="off"
                      value={passwordR}
                      required
                      onChange={(b)=>setPasswordR(b.target.value)}/>
                    <label>Password</label>
                  </div>

                  <input type="submit" value="Regístrate" className="sign-btn" />
                  <p className="text">
                    Autorizo el uso de mis datos de acuerdo a la
                    <a href="#">declaración de privacidad</a>
                    y acepto los
                    <a href="#">terminos y condiciones.</a>
                  </p>
                </div>
              </form>
            </div>
            <div className="carrousel">
              <div className="images-wrapper">
                <img src={carrousel1} className="image img-1 show" alt="" />
                <img src={carrousel2} className="image img-2" alt="" />
                <img src={carrousel3} className="image img-3" alt="" />
              </div>
              <div className="text-slider">
                <div className="text-wrap">
                  <div className="text-group">
                    <h2>Llega, pero hazlo con estilo</h2>
                    <h2>Compra, vende, administra</h2>
                    <h2>Viaja seguro, viaja verde</h2>
                  </div>
                </div>
                <div className="bullets">
                  <span className="active" data-value="1"></span>
                  <span data-value="2"></span>
                  <span data-value="3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
