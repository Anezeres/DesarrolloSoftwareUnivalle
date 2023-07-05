import veh01 from '../pages/Media/veh01.png';
import veh02 from '../pages/Media/veh02.png';
import veh03 from '../pages/Media/veh03.png';
import veh04 from '../pages/Media/veh04.png';
import veh05 from '../pages/Media/veh05.png';
import veh06 from '../pages/Media/veh06.png';
import veh07 from '../pages/Media/veh07.png';
import veh08 from '../pages/Media/veh08.png';
import veh09 from '../pages/Media/veh09.png';
import veh10 from '../pages/Media/veh10.png';
import veh11 from '../pages/Media/veh11.png';
import veh12 from '../pages/Media/veh12.png';
import veh13 from '../pages/Media/veh13.png';




import cam01 from '../pages/Media/cam01.png';
import cam02 from '../pages/Media/cam02.png';
import cam03 from '../pages/Media/cam03.png';
import cam04 from '../pages/Media/cam04.png';
import cam05 from '../pages/Media/cam05.png';
import cam06 from '../pages/Media/cam06.png';
import cam07 from '../pages/Media/cam07.png';
import cam08 from '../pages/Media/cam08.png';
import cam09 from '../pages/Media/cam09.png';

import React, { useEffect, useState } from 'react';
import './Home.css';
import './tablero.css';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './Media/logog.png';
import logo2 from './Media/logo2.png';
import image1 from './Media/img1.png';
import image2 from './Media/img2.png';
import image3 from './Media/img3.png';
import image4 from './Media/img4.png';
import image5 from './Media/img5.png';
import image6 from './Media/img6.png';
import login from '../components/PersonLoginForm';
import Comparar from './Comparar';


export function HomePage() {

  useEffect(() => {

      //PRODUCTOS

  const productos = 
  [
    //CARROS
    {
      id: "veh-01",
      titulo: "Mercedes-benz Clase Glc Glc 300e Hibrida",
      imagen: veh01,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:254900000,
      año:2012
    },
    {
      id: "veh-02",
      titulo: "Zhidou D2s Electrico",
      imagen: veh02,
      categoria: {
        nombre: "Carros",
        id: "Carros"
      },
      precio:64000000,
      año:2020
    },
    {
      id: "veh-03",
      titulo: "Renault Twizy Technic",
      imagen: veh03,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:45000000,
      año:2020
    }
    ,
    {
      id: "veh-04",
      titulo: "Mini Cooper Se Iconic Electico",
      imagen: veh04,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:17090000,
      año:2020
    },
    {
      id: "veh-05",
      titulo: "Renault Zoe Ultimate",
      imagen: veh05,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:95000000,
      año:2020
    },
    {
      id: "veh-06",
      titulo: "Zhidou D2s Electrico",
      imagen: veh06,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:54800000,
      año:2020
    },
    {
      id: "veh-07",
      titulo: "Renault Zoe Zen",
      imagen: veh07,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:136900000,
      año:2020
    },
    {
      id: "veh-08",
      titulo: "Renault Twizy Technic",
      imagen: veh08,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:45000000,
      año:2020
    },
    {
      id: "veh-09",
      titulo: "Jiayuan City Sprit Sprit",
      imagen: veh09,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:35000000,
      año:2020
    },
    {
      id: "veh-10",
      titulo: "Volkswagen Escarabajo Electrico",
      imagen: veh10,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:64000000,
      año:2020
    },
    {
      id: "veh-11",
      titulo: "Mazda Mx-30 Grand Touring Electrico",
      imagen: veh11,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:202550000,
      año:2020
    },
    {
      id: "veh-12",
      titulo: "Nissan Leaf Electrico",
      imagen: veh12,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:85900000,
      año:2020
    },
    {
      id: "veh-13",
      titulo: "Mg Marvel R Luxury",
      imagen: veh13,
      categoria: {
        nombre: "Todos los carros",
        id: "Carros"
      },
      precio:85900000,
      año:2020
    },

    //CAMIONETAS
    {
      id: "cam-01",
      titulo: "Renault Kangoo MAxi Ze Electrico",
      imagen: cam01,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:79900000,
      año:2020
    },
    {
      id: "cam-02",
      titulo: "BMW I3s Atelier",
      imagen: cam02,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:161000000,
      año:2020
    },
    {
      id: "cam-03",
      titulo: "Audi E-Tron Prestige",
      imagen: cam03,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:79900000,
      año:2020
    },
    {
      id: "cam-04",
      titulo: "Byd Yuan Plus Ev",
      imagen: cam04,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:202900000,
      año:2020
    },
    {
      id: "cam-05",
      titulo: "DongFeng Rich 6",
      imagen: cam05,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:229900000,
      año:2020
    },
    {
      id: "cam-06",
      titulo: "BMW Ix M Sport 40i",
      imagen: cam06,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:488000000,
      año:2020
    },
    {
      id: "cam-07",
      titulo: "Byd Song Plus Glx Glx",
      imagen: cam07,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:174900000,
      año:2020
    },
    {
      id: "cam-08",
      titulo: "Volvo C40 Recharge Plus Pure Electric",
      imagen: cam08,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:360000000,
      año:2020
    },
    {
      id: "cam-09",
      titulo: "Mg Zs Luxury Ev",
      imagen: cam09,
      categoria: {
        nombre: "Todas las camioneta",
        id: "Camioneta"
      },
      precio:169990000,
      año:2020
    }
  ];

    const contenedorVehiculos = document.querySelector("#contenedor-vehiculos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const tituloPrincipal = document.querySelector("#titulo-principal");
    let botonesAgregar = document.querySelectorAll(".vehiculo-agregar");

    const numerito = document.querySelector("#numerito");

    function cargarVehiculos(productosElegidos){

      contenedorVehiculos.innerHTML = "";

      productosElegidos.forEach((producto) => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="card">
          <img src="${producto.imagen}" class="producto-imagen" alt=${producto.titulo}/>
        <div class="producto-detalles">
            <h3 class="vehiculo-titulo">${producto.titulo}</h3>
            <p class="vehiculo-precio">$${producto.precio}</p>
            <button class = "vehiculo-agregar" id = "${producto.id}">Comparar</button>
          </div>
        </div>
        `;

        contenedorVehiculos.append(div);

      })

      actualizarBotonesAgregar();
    }

    cargarVehiculos(productos);

    botonesCategorias.forEach(boton => {
      boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
          const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
          tituloPrincipal.innerText = productoCategoria.categoria.nombre;

          const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
          cargarVehiculos(productosBoton);
        } else {
          tituloPrincipal.innerText = "Todos los vehiculos";
          cargarVehiculos(productos);
        }

      })
    });

    function actualizarBotonesAgregar(){
      botonesAgregar = document.querySelectorAll(".vehiculo-agregar");

      botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregaraComparar);
      });
    }

    let productosenComparar;

    let productosenCompararLS = localStorage.getItem("productos-en-comparar");

    if (productosenCompararLS){
      productosenComparar = JSON.parse(productosenCompararLS);
      actualizarNumerito();
    } else {
      productosenComparar = [];
    }

    function agregaraComparar(e) {
      const idBoton = e.currentTarget.id;
      const productoAgregado = productos.find(producto => producto.id === idBoton);

      const index = productosenComparar.findIndex(producto => producto.id === idBoton);
      if (index !== -1) {
        return;
      } else {
        productosenComparar.push(productoAgregado);
      }
      actualizarNumerito();

      localStorage.setItem("productos-en-comparar", JSON.stringify(productosenComparar));
    }

    function actualizarNumerito() {
      let nuevoNumerito = productosenComparar.length;
      numerito.innerText = nuevoNumerito;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
    document.body.appendChild(script);


      document.addEventListener("DOMContentLoaded", function() {
        const swiper = new Swiper('.swiper-container', {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          },
          loop: true,
          autoplay: {
            delay: 3000, // Cambia este valor para ajustar el tiempo de intervalo entre cada slide (en milisegundos)
          },
        });

      }
    
    );


  }, 
  [

  ]);

  return (
    <body>
      <section>
        <div className="circle"></div>
        <header>
          <a href="#"><img src= {logo} className="logo" alt="Logo"/></a>
          <a href="#"><img src={logo2} className="logo2" alt="Logo2"/></a>
          <ul className="navigation">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Carrito</a></li>
            <li><a href="#">Accede</a></li>
          </ul>
        </header>
        <div className="container">
          <div className="content">
            {/* TITULO */}
            <div className="textBox">
              <h1>GreenWheels</h1>
              <p>Si quieres llegar lejos, hazlo con estilo</p>
              <a href='login'>YA SOY CLIENTE</a>
            </div>

            {/* IMAGENES CARROS */}
            <div className="imgBox">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <img src={image1} className="swiper-slide" alt="Image 1"/>
                  <img src={image2} className="swiper-slide" alt="Image 2"/>
                  <img src={image3} className="swiper-slide" alt="Image 3"/>
                  <img src={image4} className="swiper-slide" alt="Image 4"/>
                  <img src={image5} className="swiper-slide" alt="Image 5"/>
                  <img src={image6} className="swiper-slide" alt="Image 6"/>
                </div>
              </div>
            </div>

            {/* BARRA DE BUSQUEDA */}

          </div>
        </div>
      </section>

      <div className="wrapper">
        <aside>
          <header>
            <h1 className="cabeza">GreenWheels</h1>
          </header>
          <nav>
            <ul className="menu">
              <li>
                <button id="todos" className="boton-menu boton-categoria active">
                  <i className="bi bi-hand-index-thumb-fill"></i>Todos los vehículos
                </button>
              </li>
              <li>
                <button id="Carros" className="boton-menu boton-categoria">
                  <i className="bi bi-hand-index-thumb"></i>Carros
                </button>
              </li>
              <li>
                <button id="Camioneta" className="boton-menu boton-categoria">
                  <i className="bi bi-hand-index-thumb"></i>Camionetas
                </button>
              </li>
              <li>
              <a href = 'Comparar' className="boton-menu boton-interesado">
                  <i className="bi bi-cart-fill"></i>Comparar
                  <span id="numerito" className="numerito"></span>
                </a>
              </li>
            </ul>
          </nav>
          <footer>
            <p className="texto-footer">© 2023 GreenWheels</p>
          </footer>
        </aside>
        <div className='main'>
          <h2 className="titulo-principal" id="titulo-principal">Todos los vehículos</h2>
          <div id="contenedor-vehiculos" className="contenedor-vehiculos">
            {/* EL CONTENIDO DE AQUÍ SE RELLENA CON EL TABLERO.JS */}
          </div>
          </div>
      </div>



    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

      {/* Follow */}
      <div className="follow">
        <p>Sigue a GreenWheels
          <a href="https://facebook.com">
            <img src="https://i.ibb.co/LrVMXNR/social-fb.png" alt="Facebook" />
          </a>
          <a href="https://twitter.com">
            <img src="https://i.ibb.co/vJvbLwm/social-twitter.png" alt="Twitter" />
          </a>
          <a href="https://linkedin.com">
            <img src="https://i.ibb.co/b30HMhR/social-linkedin.png" alt="Linkedin" />
          </a>
        </p>
      </div>

      {/* Links */}
      <div className="links">
        <div className="links-inner">
          <ul>
            <li><h3>Ayuda</h3></li>
            <li><a href="#">Modifica tu usuario</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Resolución de problemas</a></li>
          </ul>
          <ul>
            <li><h3>Encuéntranos</h3></li>
            <li><a href="#">Nuestras sedes</a></li>
            <li><a href="#">Contáctanos</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
          </ul>
          <ul>
            <li><h3>Sobre nosotros</h3></li>
            <li><a href="#">Nuestra historia</a></li>
            <li><a href="#">Misión</a></li>
            <li><a href="#">Privacidad</a></li>
          </ul>
          <ul>
            <li><h3>Mi cuenta</h3></li>
            <li><a href="#">Ingresa</a></li>
            <li><a href="#">Mis reparaciones</a></li>
            <li><a href="#">Coche a tu estilo</a></li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <ul>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Contact GreenWheels</a></li>
            <li><a href="#">Privacy & cookies</a></li>
            <li><a href="#">Terms of use</a></li>
            <li><a href="#">Safety & eco</a></li>
            <li><a href="#">About our ads</a></li>
            <li><a href="#">&copy; GreenWheels 2023</a></li>
          </ul>
        </div>
      </footer>
    </body>
  );

}

export default HomePage;


