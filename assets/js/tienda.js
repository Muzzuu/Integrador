let btnCrear = document.getElementById("btn-crear");
let formulario = document.getElementById("formulario");
let navLogin = document.getElementById("nav-login");
let insertUser = document.getElementById("user-profile");
let prodComprados = document.getElementById("prod-comprados");
let deletableProd = false;
let apiDolar = 0;
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
  admin: false,
};

async function precioDolar(){
  await fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((response) => response.json())
      .then((resultado) => {
        apiDolar = resultado.oficial.value_avg;
        insertUser.innerHTML = `<p id="user-name">${apiDolar}</p>`;
      })

      
      .catch((error) => console.log(error),
        (insertUser.innerHTML = `<p id="user-name">Actualizando precios...</p>`)
      );
    return apiDolar;
}


if (adminLogin.admin) {
  navLogin.innerText = "Cerrar Sesión";
  let vistaVendedor = document.getElementById("vista-vendedor");
  vistaVendedor.innerHTML = "(vista del vendedor)";
  formulario.style.display = "none";
  insertUser.innerHTML = `<p id="user-name" class="saludo">Holiss, Bienvenid@ de nuevo!!!</p>`;
  deletableProd = true;
} 
else {
  deletableProd = false;
  btnCrear.style.display = "none";
  const crearUsuario = () => {
    let nombreUser = JSON.parse(sessionStorage.getItem("nombreUser"));
    let apellidoUser = JSON.parse(sessionStorage.getItem("apellidoUser"));
    let fotoUser = JSON.parse(sessionStorage.getItem("fotoUser"));
    insertUser.innerHTML = `<p id="user-name" class="saludo2" >Holis, ${nombreUser} ${apellidoUser} Bienvenid@!!!</p>
                            <img src="${fotoUser}" id="user-pic">`;
  };

  /* if (sessionStorage.getItem("nombreUser") != null) {
    crearUsuario();
  } else { */
    await precioDolar();

  }


const estadoFormulario = {
  mostrar: false,
};

btnCrear.onclick = (e) => {
  e.preventDefault();
  if (estadoFormulario.mostrar) {
    btnCrear.innerText = "Crear un producto";
    formulario.style.display = "none";
    estadoFormulario.mostrar = false;
  } else {
    btnCrear.innerText = "Cancelar";
    formulario.style.display = "flex";
    estadoFormulario.mostrar = true;
  }
};

class Producto {
  constructor(nombre, precio,precioD, id, image) {
    this.nombre = nombre;
    this.precio = precio;
    this.precioD = precioD;
    this.id = id;
    this.image = image;
  }
}

let crearProd = document.getElementById("btn-crear");

let listaProductos = [];
async function cargarProductos(){
  if (!localStorage.getItem("productos")) {
    let apiDolar = await precioDolar();
    listaProductos = [
      {
        nombre: `Velas de vainilla`,
        precio: 4000,
        precioD: Math.floor(4000/apiDolar),
        id: 1,
        image:
          "https://i.pinimg.com/564x/f0/19/af/f019afe3a50ee0cbd75fd372ab08d3e9.jpg",
      },
      {
        nombre: "Sahumos Florales",
        precio: 3500,
        precioD:Math.floor(3500/apiDolar),
        id: 2,
        image:
          "https://i.pinimg.com/564x/3e/f8/b1/3ef8b13ab17899f39057a6a020d56ec1.jpg",
      },
      {
        nombre: "Caja de Cristales",
        precio: 35000,
        precioD:Math.floor(35000/apiDolar),
        id: 3,
        image:
          "https://i.pinimg.com/564x/fc/5d/4a/fc5d4adff5e931045f05ca1bd4924988.jpg",
      },
      {
        nombre: "KIT para brujas",
        precio: 7300,
        precioD:Math.floor(7300/apiDolar),
        id: 4,
        image:
          "https://i.pinimg.com/564x/19/a8/56/19a8563c474474e22cd5859f5b479006.jpg",
      },
    ];
    localStorage.setItem("productos", JSON.stringify(listaProductos));
  } else {
    listaProductos = JSON.parse(localStorage.getItem("productos"));
  }
} 

await cargarProductos();


let id = listaProductos.length;
const agregarProducto = async () => {
  let apiDolar = await precioDolar();
  let nombre = document.getElementById("nombre").value;
  nombre = nombre.toUpperCase();
  let precio = document.getElementById("precio").value;
  let precioD = Math.floor(precio/apiDolar);
  let image = document.getElementById("image").value;
  id++;
  let productoNuevo = new Producto(nombre, precio,precioD, id, image);
  listaProductos.unshift(productoNuevo);

  localStorage.setItem("productos", JSON.stringify(listaProductos));
  return productoNuevo;
};


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let btnAgregar = document.getElementById("agregar");
let nombre=document.getElementById("nombre").value;
let precio = document.getElementById("precio").value;
let precioD = document.getElementById("precioD");
let image = document.getElementById("image").value;

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  if (nombre.value != "" && precio.value != "" && image.value != "") {
    document.getElementById("main-cards").innerHTML = "";
    agregarProducto();

    listaProductos.forEach((elemento) => {
      let nodo = document.createElement("div");
      nodo.setAttribute("class", "card");
      nodo.innerHTML = `<img src="${elemento.image}" class="card-img-top"  alt="${elemento.nombre}">
                <div class="card-body" id="card-body">
                    <h5 class="card-title">${elemento.nombre}</h5>
                    <p class="card-text">$${elemento.precio}</p>
                    <br>
                    <p class="card-text">USD$${elemento.precioD}</p>
                    <button class="btn btn-primary" id="button${elemento.id}">Añadir al carrito</button>  
                </div> `;
      document.getElementById("main-cards").appendChild(nodo);
      const addToCart = document.getElementById(`button${elemento.id}`);
      const deleteProduct = document.getElementById(`delete${elemento.id}`);
      if (deletableProd) {
        nodo.innerHTML += `<a class="close-icon" id="delete${elemento.id}"><i class="fa-solid fa-xmark"></i></a>`;
      }

      addToCart.addEventListener("click", () => {
        contadorProductos++;
        contadorProd();
        carrito.unshift(elemento);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        Swal.fire("Agregaste: " + elemento.nombre);
      });
      document.addEventListener("DOMContentLoaded", function () {
        deleteProduct.addEventListener("click", () => {
          let deleteIndex = listaProductos.findIndex(function (product) {
            return product.nombre === elemento.nombre;
          });
          if (deleteIndex !== -1) {
            listaProductos.splice(deleteIndex, 1);
            document.getElementById("main-cards").removeChild(nodo);
            localStorage.setItem("productos", JSON.stringify(listaProductos));
          }
        });
      });
    });
  } else {
    Swal.fire("Campos incompletos, porfavor ingrese todos los datos");
  }
});

let contadorProductos = localStorage.getItem("prod-comprados");

function contadorProd() {
  prodComprados.innerHTML = `${contadorProductos}`;
  prodComprados.style.display = "block";
  localStorage.setItem("prod-comprados", contadorProductos);
}
if (contadorProductos > 0 && contadorProductos != undefined) {
  contadorProd();
} else {
  prodComprados.style.display = "none";
}

listaProductos.forEach((elemento) => {
  let nodo = document.createElement("div");
  nodo.setAttribute("class", "card");
  nodo.innerHTML = `<img src="${elemento.image}" class="card-img-top" alt="${elemento.nombre}">
        <div class="card-body" id="card-body">
            <h5 class="card-title">${elemento.nombre}</h5>
            <p class="card-text">$${elemento.precio}</p>
            <p class="card-text">USD$${elemento.precioD}</p>

            <button class="btn btn-primary" id="button${elemento.id}">Añadir al carrito</button>
        </div>`;
  document.addEventListener("DOMContentLoaded", function () {
    if (deletableProd) {
      nodo.innerHTML += `<a class="close-icon" id="delete${elemento.id}"><i class="fa-solid fa-xmark"></i></a>`;
      const deleteProduct = document.getElementById(`delete${elemento.id}`);
      deleteProduct.addEventListener("click", () => {
        let deleteIndex = listaProductos.findIndex(function (product) {
          return product.nombre === elemento.nombre;
        });
        if (deleteIndex !== -1) {
          listaProductos.splice(deleteIndex, 1);
          document.getElementById("main-cards").removeChild(nodo);
          localStorage.setItem("productos", JSON.stringify(listaProductos));
        }
      });
    }
  });

  document.getElementById("main-cards").appendChild(nodo);
  const addToCart = document.getElementById(`button${elemento.id}`);
  addToCart.addEventListener("click", () => {
    contadorProductos++;
    contadorProd();
    carrito.unshift(elemento);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire("Agregaste: " + elemento.nombre);
  });
});
