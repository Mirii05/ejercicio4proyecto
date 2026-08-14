const contenedorPrincipal = document.getElementById("contenedorPrincipal");
const botonBuscarID = document.getElementById("botonBuscarID");
const botonLimpiar = document.getElementById("botonLimpiar");
const mostrarDatosUsuario = document.getElementById("mostrarDatosUsuario");
const mensajeError = document.getElementById("mensajeError");
const inputID = document.getElementById("ingresaID");
//----------------funciones----------------
async function ingresaBuscaID(){//obtinene el ID y coordina el proceso
    console.log("se hizo clic en buscar");
    const idIngresadoString = inputID.value;
    const idIngresado = Number(idIngresadoString);
    if (idIngresado < 1 || idIngresado > 10 || idIngresado%1 !== 0 ){
        mensajeError.textContent = "Por favor ingresa un ID válido (números del 1 al 10)";
        return;
    }
    console.log("ID ingresado:", idIngresado);
    const datos = await obtenerID(idIngresado);//ejecuta obtenerID, espera su resultado y lo guarda en datos
    mostrarInformacion(datos);
}

async function obtenerID(idIngresado) { //ejecuta obtenerID
    try{
        const informacion = await fetch("https://jsonplaceholder.typicode.com/users/" + idIngresado);
        if(informacion.ok){
            console.log("La petición fue exitosa");
            const datos = await informacion.json();
            return datos;
        }else{
            console.log("La petición falló");
            console.log("Estatus:", informacion.status);
        }
    }catch (error){
        console.log("Ocurrió un error: ", error);
    }
}
function mostrarInformacion(datos){
    const {name, 
           username,
           email,
           address: { street, city, zipcode }
        } = datos;
    
    mostrarDatosUsuario.innerHTML = `
    <p>Nombre: ${name}</p>
    <p>Usuario: ${username}</p>
    <p>Email: ${email}</p>
    <p>Dirección</p>
    <p>Calle: ${street}</p>
    <p>Ciudad: ${city}</p>
    <p>Código postal: ${zipcode}</p>`;
}

function limpiarDatos(){
    inputID.value = "";
    mostrarDatosUsuario.innerHTML = "Información del usuario";
    mensajeError.textContent = "";
}
//----------------eventos-----------------
botonBuscarID.addEventListener("click", ingresaBuscaID);
botonLimpiar.addEventListener("click", limpiarDatos);

