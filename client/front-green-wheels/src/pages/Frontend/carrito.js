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
