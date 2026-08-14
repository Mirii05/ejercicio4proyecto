const contenedorPrincipal = document.getElementById("contenedorPrincipal");
const botonBuscarID = document.getElementById("botonBuscarID");
const botonLimpiar = document.getElementById("botonLimpiar");
const mostrarDatosUsuario = document.getElementById("mostrarDatosUsuario");
const mensajeError = document.getElementById("mensajeError");
const inputID = document.getElementById("ingresaID");
//----------------funciones----------------
async function ingresaBuscaID(){
    console.log("se hizo clic en buscar");
    const idIngresado = inputID.value;
    if (idIngresado === ""){
        mensajeError.textContent = "Por favor ingresa un ID válido";
    }
    console.log("ID ingresado:", idIngresado);
    const datos = await obtenerID(idIngresado);//tengo duda
    mostrarInformacion(datos);//tengo duda
}
async function obtenerID(idIngresado) {
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
    mostrarDatosUsuario.innerHTML = `
    <p>Nombre: ${datos.name}</p>
    <p>Usuario: ${datos.username}</p>
    <p>Email: ${datos.email}</p>
    <p>Dirección</p>
    <p>Calle: ${datos.address.street}</p>
    <p>Ciudad: ${datos.address.city}</p>
    <p>Código postal: ${datos.address.zipcode}</p>`;
}
//----------------eventos-----------------
botonBuscarID.addEventListener("click", ingresaBuscaID);

