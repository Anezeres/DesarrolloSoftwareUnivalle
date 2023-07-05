import { useEffect } from "react";

export function Comparar(){
    useEffect(() => {
        let productosenComparar = obtenerProductosEnComparar();

        const contenedorInteresadoVacio = document.querySelector("#interesado-vacio");
        const contenedorVehiculosInteresados = document.querySelector("#vehiculos-interesados");
        const contenedorVehiculoAcciones = document.querySelector("#vehiculo-acciones");
        let botonesEliminar = document.querySelectorAll(".preguntar-vehiculo-eliminar");
        const botonVaciar = document.querySelector("#vehiculo-acciones-vaciar");

        function obtenerProductosEnComparar() {
        const productos = localStorage.getItem("productos-en-comparar");
        return productos ? JSON.parse(productos) : [];
        }

        function guardarProductosEnComparar() {
        localStorage.setItem("productos-en-comparar", JSON.stringify(productosenComparar));
        }

        function cargarVehiculosInteresado() {
        if (productosenComparar.length > 0) {
            contenedorInteresadoVacio.classList.add("disabled");
            contenedorVehiculosInteresados.classList.remove("disabled");
            contenedorVehiculoAcciones.classList.remove("disabled");

            contenedorVehiculosInteresados.innerHTML = "";

            productosenComparar.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("vehiculo-interesado");
            div.innerHTML = `
                <img class="interesado-vehiculo-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="preguntar-vehiculo-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
                </div>
                <div class="preguntar-vehiculo-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
                </div>
                <div class="preguntar-vehiculo-año">
                <small>Año</small>
                <p>${producto.año}</p>
                </div>
                <button class="preguntar-vehiculo-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `;
            contenedorVehiculosInteresados.append(div);
            });
        } else {
            contenedorInteresadoVacio.classList.remove("disabled");
            contenedorVehiculosInteresados.classList.add("disabled");
            contenedorVehiculoAcciones.classList.add("disabled");
        }

        actualizarBotonesEliminar();
        }

        function actualizarBotonesEliminar() {
        botonesEliminar = document.querySelectorAll(".preguntar-vehiculo-eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
        }

        function eliminarDelCarrito(e) {
        const idBoton = e.currentTarget.id;
        const index = productosenComparar.findIndex(producto => producto.id === idBoton);
        
        if (index !== -1) {
            productosenComparar.splice(index, 1);
            guardarProductosEnComparar();
            cargarVehiculosInteresado();
        }
        }

        function vaciarCarrito() {
        productosenComparar = [];
        guardarProductosEnComparar();
        cargarVehiculosInteresado();
        }

        botonVaciar.addEventListener("click", vaciarCarrito);

        cargarVehiculosInteresado();

    })
    
    return (
        <div className="wrapper">
      <aside>
        <header>
          <h1 className="cabeza">GreenWheels</h1>
        </header>
        <nav>
          <ul className="menu">
            <li>
              <a className="boton-menu boton-volver" href="./home-page.html">
                <i className="bi bi-arrow-return-left"></i>Seguir buscando
              </a>
            </li>
            <li>
              <a className="boton-menu boton-interesado active" href="./carrito.html">
                <i className="bi bi-cart-fill"></i>Comparar
              </a>
            </li>
          </ul>
        </nav>
        <footer>
          <p className="texto-footer">© 2023 GreenWheels</p>
        </footer>
      </aside>
      <main>
        <h2 className="titulo-principal">¡Compara entre las características principales!</h2>
        <div className="contenedor-preguntar">
          <p id="interesado-vacio" className="interesado-vacio">Aún no tienes ningún vehiculo para comparar <i className="bi bi-emoji-frown-fill"></i></p>
          <div id="vehiculos-interesados" className="vehiculos-interesados disabled">
            {/* ESTO SE RELLENA CON EL CARRITO.JS */}
          </div>
          <div id="vehiculo-acciones" className="vehiculo-acciones disabled">
            <button id="vehiculo-acciones-vaciar" className="vehiculo-vaciar">Eliminar todo</button>
          </div>
        </div>
      </main>
    </div>
    )
}