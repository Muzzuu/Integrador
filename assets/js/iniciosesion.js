
let login = document.getElementById("login")
let btnLogin = document.getElementById("btn-login");
let navLogin = document.getElementById("nav-login");
let insertUser = document.getElementById("user-profile");


const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}


if (adminLogin.admin) {

    insertUser.innerHTML = `
                <p id="user-name">Holiss, Bienvanid@ de nuevo!!!</p>
                `
    navLogin.innerText = "Cerrar Sesión";
    login.innerHTML = "";
    login.innerHTML = `
    <h1>Holiss, Volve Pronto!!!</h1>
    <button type="submit" class="login-submit btn btn-primary" id="btn-unlog">Cerrar Sesión</button>
    `
   
    let btnUnlog = document.getElementById("btn-unlog"); 
    btnUnlog.onclick = (e) => {
        e.preventDefault();

        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#a8a8ce',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                adminLogin.admin = false;
                localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
                window.location.reload();
            }
        });
    };
}


let prodComprados = document.getElementById("prod-comprados");
let contadorProductos = localStorage.getItem("prod-comprados");

function contadorProd() {
    prodComprados.innerHTML = `${contadorProductos}`;
    prodComprados.style.display = "block";
    if (contadorProductos <= 0 || contadorProductos == undefined) {
        prodComprados.style.display = "none";
    }
}
contadorProd();


btnLogin.onclick = (e) => {
    e.preventDefault();
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    if (user == "admin" && pass == "123") {
        adminLogin.admin = true;
        console.log(adminLogin.admin)
        window.location.href = "http://127.0.0.1:5500/tienda.html";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Hubo un problema...',
            text: 'Lo sentimos no se pudo ingresar a "' + user + '"',
        })
    }
    localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
}