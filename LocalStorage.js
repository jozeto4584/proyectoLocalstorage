
//variabels globales

const d = document;
let clienteInput = d.querySelector(".cliente");
let productoInput = d.querySelector(".producto");
let precioInput= d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table > tbody");

// agregar evento click al boton del formulario
btnGuardar.addEventListener("click", () => {
    //alert(clienteInput.value);
  let datos =   validarFormulario();
  if (datos != null){
      guardarDatos(datos);
    }
    borrarTabla();
    mostrarDatos();
});

//funcuion para validar lodsn campos del formulario

function validarFormulario(){
    let datosForm;
    if(clienteInput.value == "" || productoInput.value == ""  || precioInput.value == "" ||imagenInput.value == "" )

    {
        alert("Todos los campos del formulario son obligatorios")

        return ;
            
    } else{
        datosForm ={
            cliente : clienteInput.value,
            producto :productoInput.value,
            precio : precioInput.value,
            imagen : imagenInput.value,
            observacion : observacionInput.value
        }
        
    

    console.log(datosForm)
    clienteInput.value ="";
    productoInput.value=""
    precioInput.value = "";
    imagenInput.value = "";
    observacionInput.value = "";


    return datosForm;
     }
}
// funcion guardar datos en locql storage
const listadoPedidos = "Pedidos";

function guardarDatos( datos ){

    let Pedidos = [];
    //extraer datos guardados previamente en el local storage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));

    //validar datos guardados previamente en el localStorage
    if (pedidosPrevios != null){
        Pedidos =pedidosPrevios;

    }

    //agregar el nuevo pedido nuevo al array
    Pedidos.push(datos);


    //guardar en local storage

    localStorage.setItem(listadoPedidos, JSON.stringify(Pedidos));

    //validar que los datos quedaron guardados
    alert("Datos guardados con exito");


}


//funcion para extraert datos guardados en el localStorage

function mostrarDatos(){
    let Pedidos = []
     //extraer datos guardados previamente en el local storage
     let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos)) 
       //validar datos guardados previamente en el localStorage
    if (pedidosPrevios != null){
        Pedidos =pedidosPrevios;

    }

    Pedidos.forEach((p,i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
        <td> ${i+1} </td>
        <td> ${ p.cliente} </td>
        <td> ${ p.producto} </td>
        <td> ${ p.precio} </td>
        <td> <img src=" ${ p.imagen} " width ="50%"> </td>
        <td> ${ p.observacion} </td>
        <td> 
        <span onclick="actualizarPedido(${i})" class= "btn-editar btn btn-warning"> 🖊️</span>
        <span onclick="eliminarPedido(${i})" class= "btn-eliminar btn btn-danger"> ✖️ </span>
        </td>
        
        `
        tabla.appendChild(fila);
    });



}

//quitar los datos de la tabla

function borrarTabla() {
    let filas = d.querySelectorAll(".table tbody tr")

    //console.log(filas)
    filas.forEach((f)=>{
        f.remove();
    });
    
}


//funcion eliminar un pedido

function eliminarPedido(pos){
    let Pedidos = []
     //extraer datos guardados previamente en el local storage
     let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos)) 
       //validar datos guardados previamente en el localStorage
    if (pedidosPrevios != null){
        Pedidos =pedidosPrevios;

    }
    //confirmar pedido a eliminar
    let confirmar= confirm("¿Deseas eliminar el pedido del cliente "+Pedidos [pos].cliente +"?");
        if(confirmar){
         //   alert("lo eliminaste")
         Pedidos.splice(pos,1);
        alert("Peedido Eliminado con exito");
        //guardar los datos que quedaron en localStorage

        localStorage.setItem(listadoPedidos,JSON.stringify(Pedidos));
        borrarTabla();
        mostrarDatos();
    }


  }

  //actualizar pedido de localStorage
  function actualizarPedido(pos){
    let Pedidos = []
    //extraer datos guardados previamente en el local storage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos)) 
      //validar datos guardados previamente en el localStorage
   if (pedidosPrevios != null){
       Pedidos =pedidosPrevios;

   }

   //pasar los datos al formulario para editarlos
   clienteInput.value = Pedidos[pos].cliente
   productoInput.value=Pedidos[pos].producto
   precioInput.value=Pedidos[pos].precio
   observacionInput.value=Pedidos[pos].observacion

   //seleccionar boton de actualizar 
   let btnActualizar = d.querySelector(".btn-actualizar");
   btnActualizar.classList.toggle("d-none");
   btnGuardar.classList.toggle("d-none");

   //agregar evento al boton de actualizar

   btnActualizar.addEventListener("click", function () {
    Pedidos[pos].cliente=clienteInput.value;
    Pedidos[pos].producto=productoInput.value
    Pedidos[pos].precio=precioInput.value
    Pedidos[pos].observacion=observacionInput.value


    //guardar los datos editados en localStorage

    localStorage.setItem(listadoPedidos, JSON.stringify(Pedidos));
    alert("El dato fue actualizado con exito")

    
    
    clienteInput.value = "";
    productoInput.value= ""
    precioInput.value = "";
    observacionInput.value = "";

    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none")
    
    borrarTabla();
    mostrarDatos();
    
});


  }

//motrar los datos de local Storage al recargar la pagina
d.addEventListener("DOMContentLoaded",function(){
    borrarTabla();
    mostrarDatos();
})

const inputBuscar = d.querySelector(".buscar");
inputBuscar.addEventListener("input", buscarPedidos);

function buscarPedidos() {
    const textoBusqueda = inputBuscar.value.trim().toLowerCase();
    const filas = d.querySelectorAll(".table tbody tr");

    filas.forEach((fila) => {
        const cliente = fila.querySelector("td:nth-child(2)").textContent.toLowerCase();
        const producto = fila.querySelector("td:nth-child(3)").textContent.toLowerCase();
        const precio = fila.querySelector("td:nth-child(4)").textContent.toLowerCase();
        const observacion = fila.querySelector("td:nth-child(6)").textContent.toLowerCase();
        
        if (cliente.includes(textoBusqueda) || producto.includes(textoBusqueda) || precio.includes(textoBusqueda) || observacion.includes(textoBusqueda)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}
