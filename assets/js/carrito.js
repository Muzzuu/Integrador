let insertUser = document.getElementById("user-profile");
let navLogin = document.getElementById("nav-login");
let carritoContainer = document.getElementById("cart-container");
let confirmaCompra = document.getElementById("confirma-compra");
let totalCarrito = document.getElementById("total");
let totalCarritoD = document.getElementById("totalD");
let sumaTotal = 0;
let sumaTotalD = 0;
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
  admin: false,
};

if (adminLogin.admin) {
  navLogin.innerText = "Cerrar Sesión";
  insertUser.innerHTML = `<p id="user-name"  class="saludo" >Holiss, Bienvenid@ de nuevo!!!</p>`;
} 

else {
  const crearUsuario = () => {
    let nombreUser = JSON.parse(sessionStorage.getItem("nombreUser"));
    let apellidoUser = JSON.parse(sessionStorage.getItem("apellidoUser"));
    let fotoUser = JSON.parse(sessionStorage.getItem("fotoUser"));
    insertUser.innerHTML = `<p id="user-name" class="saludo2">Holiss, ${nombreUser} ${apellidoUser} Bienvenid@!!!</p>
                            <img src="${fotoUser}" id="user-pic">`;
  };

  if (sessionStorage.getItem("nombreUser") != null) {
    crearUsuario();
  } 
}


let prodComprados = document.getElementById("prod-comprados");
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

let idProd = 0;
const carritoCompleto = JSON.parse(localStorage.getItem("carrito")) || [];
carritoCompleto.forEach((producto) => {
  let prodCarrito = document.createElement("div");

  if (carritoCompleto.length > 0) {
    idProd++;
  }
  prodCarrito.innerHTML = `<div class="cart-item">
                           <p class="card-title">${producto.nombre}</p>
                           <p class="card-text">$${producto.precio}</p>
                           <button class="btn btn-danger btn-sm elim-prod" id="borrar${idProd}">x</button>
                          </div>`;

                          
  let precio = parseInt(producto.precio);
  sumaTotal = sumaTotal + precio;
  sumaTotalD = ((sumaTotalD + precio)/362);
  carritoContainer.appendChild(prodCarrito);
  let btnBorrar = document.getElementById(`borrar${idProd}`);
  btnBorrar.addEventListener("click", (e) => {
    sumaTotal = sumaTotal - precio;
    sumaTotalD = ((sumaTotalD - precio)/362);
    calcTotal();
    calcTotalD();
    contadorProductos--;
    contadorProd();
    if (contadorProductos <= 0 || contadorProductos == undefined) {
      prodComprados.style.display = "none";
      localStorage.setItem("prod-comprados", 0);
    }
    borrarProductos(e);
    const index = carritoCompleto.indexOf(producto);
    if (index > -1) {
      carritoCompleto.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
    if (carritoCompleto.length == 0) {
      carritoContainer.innerHTML = `<h3>El carrito está vacío</h3>
                                    <a class="login-submit btn btn-primary" href="../../tienda.html">¡Compra algo!</a>`;
      confirmaCompra.style.display = "none";
    }
  });
});


function borrarProductos(e) {
  let botonBorrarClick = e.target;
  botonBorrarClick.parentElement.remove();
}


if (carritoCompleto === undefined || carritoCompleto.length == 0) {
  carritoContainer.innerHTML = `<h3>El carrito está vacío</h3>
                                <a class="login-submit btn btn-primary" href="../../tienda.html">¡Compra algo!</a>`;
  confirmaCompra.style.display = "none";
} else {
  confirmaCompra.style.display = "block";
  confirmaCompra.onclick = (e) => {
    localStorage.setItem("prod-comprados", 0);
    e.preventDefault();
    while (carritoCompleto.length > 0) {
      carritoCompleto.pop();
    }
    localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
    
    Swal.fire(
      "¡Gracias por comprar en GOOD VIBES!",
      "¡Que tengas un buen día!",
      "success"
    ).then((resultado) => {
      if (resultado.isConfirmed) {
        window.location.reload();
      }
    });
  };
}

function calcTotal() {
  if (sumaTotal == 0) {
    totalCarrito.style.display = "none";
  } else {
    totalCarrito.innerHTML = `Total $${sumaTotal}`;
  }
}

function calcTotalD() {
  if (sumaTotalD == 0) {
    totalCarritoD.style.display = "none";
  } else {
    totalCarritoD.innerHTML = `Total USD$${sumaTotalD}`;
  }
}
calcTotal();
calcTotalD();
