
let btnGuardar = document.querySelector("#btnGuardar"),
    check = document.querySelector("#check");

const nombre = document.querySelector("#nombre"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    p = document.querySelector("p");

btnGuardar.innerText = "Registrarse"



let clientesSessionStorage = []
let clientesLocalStorage = []



function guardar(valor) {
    let user = { uNombre: nombre.value, uEmail: email.value, uPassword: password.value };

    if (user.uNombre == "" || user.uEmail == "" || user.uPassword == "") {
        campoObligatorio.innerText = "Complete todos los campos";
        return;
    } else {
        let { uNombre: nombre, uEmail: email } = user
        if (valor === "sessionStorage") {
            
            clientesSessionStorage.push(user)
            sessionStorage.setItem("usuario", JSON.stringify(clientesSessionStorage))
            let html;
            html = `
                    <div class="col s4 m3">
                        <div>
                            <div class="d-flex flex-column align-items-center justify-content-between p-5 m-5">
                                <h2>Bienvenido ${nombre}</h2>
                                <h4>Gracias por registrarte </h4>
                                <p>El email de registro es: $${email}</p>
                            </div>
                        </div>
                    </div>`;

            contenedor.innerHTML += html;
        }
        if (valor === "localStorage") {
            clientesLocalStorage.push(user)
            localStorage.setItem("usuario", JSON.stringify(clientesLocalStorage))

            let html;
            html = `
                    <div class="col s4 m3">
                        <div>
                            <div class="d-flex flex-column align-items-center justify-content-between p-5 m-5">
                                <h2>Bienvenido ${nombre}</h2>
                                <h4>Gracias por registrarte </h4>
                                <p class="p-5 m-5">El email de registro es: ${email}</p>
                            </div>
                        </div>
                    </div>`;

            contenedor.innerHTML += html;
        }
    }
}


function recuperoDatos(datos) {
    if (datos) {
        nombre.value = datos.uNombre;
        email.value = datos.uEmail;
        password.value = datos.uPassword;
        btnGuardar.innerText = "Registro Exitoso"
    }
}

recuperoDatos(JSON.parse(localStorage.getItem("persona")));


btnGuardar.addEventListener("click", (event) => {
    console.log(event.target);
    event.preventDefault()
    if (check.checked) {
        guardar("localStorage")
    } else {
        guardar("sessionStorage")
    }
});