//PRODUCTOS

const productos = 
[
  //CARROS
  {
    id: "veh-01",
    titulo: "Mercedes-benz Clase Glc Glc 300e Hibrida",
    imagen:"./Media/veh01.png",
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
    imagen:"./Media/veh02.png",
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
    imagen:"./Media/veh03.png",
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
    imagen:"./Media/veh04.png",
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
    imagen:"./Media/veh05.png",
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
    imagen:"./Media/veh06.png",
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
    imagen:"./Media/veh07.png",
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
    imagen:"./Media/veh08.png",
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
    imagen:"./Media/veh09.png",
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
    imagen:"./Media/veh10.png",
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
    imagen:"./Media/veh11.png",
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
    imagen:"./Media/veh12.png",
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
    imagen:"./Media/veh13.png",
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
    imagen:"./Media/cam01.png",
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
    imagen:"./Media/cam02.png",
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
    imagen:"./Media/cam03.png",
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
    imagen:"./Media/cam04.png",
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
    imagen:"./Media/cam05.png",
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
    imagen:"./Media/cam06.png",
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
    imagen:"./Media/cam07.png",
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
    imagen:"./Media/cam08.png",
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
    imagen:"./Media/cam09.png",
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

  productosElegidos.forEach(producto => {

    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <div class = "card">
      <img class="producto-img" src = "${producto.imagen}" alt = "${producto.titulo}">
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
  var swiper = new Swiper('.swiper-container', {
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
});
