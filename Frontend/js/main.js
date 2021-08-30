import { Usuario, Crud} from "./crud.js";

sessionStorage.removeItem('budgetData');

if(JSON.parse(localStorage.getItem('ActiveUser'))!=null && JSON.parse(localStorage.getItem('ActiveUser')) != undefined ) { 
  console.log("Use esta logeado");
}else{
  console.log("Aun no estas logeado");
  window.location.href = "../html/login.html";
}

let usuario = JSON.parse(localStorage.getItem('ActiveUser'))[0].usuario;
let token = JSON.parse(localStorage.getItem('ActiveUser'))[1].token;
let focusActual = null;

async function mostrarPresupuestos(){
  let presupuestos = await Crud.listarPresupuestos(usuario.id, token);
  let tabla = document.getElementById('contenido-tabla');
  console.log(presupuestos);
  let vista = ``;
  presupuestos.forEach(element => {
    vista += `
    <tr>      
      <th style="width: 4%;">
        <input type="radio" class="btn-check" name="presupuestos" id="${element.id}" autocomplete="off">
        <label class="btn btn-outline-primary" for="${element.id}">${element.id}</label>      
      </th>
      <td style="width: 20%;">${element.fechaCreacion}</td>
      <td style="width: 20%;">${element.proyecto}</td>
      <td style="width: 20%;">${element.versionn}</td>
    </tr>
    `;
  });
  tabla.innerHTML = vista;

  presupuestos.forEach(element => {
    let boton = document.getElementById(element.id);
    boton.addEventListener('change', () =>{
      focusActual = element.id;
    });
  });  
}

if(JSON.parse(localStorage.getItem('ActiveUser')) == null){
  window.location.href = "../html/login.html";
}else{  
  console.log(JSON.parse(localStorage.getItem('ActiveUser')));
  document.getElementById('nombreUsuario').textContent = usuario.nombre;
  mostrarPresupuestos();  
}

document.getElementById('botonLogout').addEventListener('click', async () =>{
  window.location.href = "../html/login.html";
  localStorage.removeItem('ActiveUser');
});

document.getElementById('botonNuevo').addEventListener('click', async () =>{
  do{
    var nombre = window.prompt("Por favor ingrese el nombre del proyecto", "");
  }while(nombre == "");

  var date = new Date();
  console.log(date.getDate());
  var fecha = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
  console.log(fecha);
  
  let presupuesto = await Crud.crearPresupuesto(usuario.id, fecha, nombre, '1.0.0', token);
  if (presupuesto.error) {
    alert(presupuesto.error)
  }else{
    let data = { id: presupuesto.id };
    sessionStorage.setItem('budgetData',JSON.stringify(data));
    window.location.href = "../html/edicion.html";    
  }
});

document.getElementById('botonEditar').addEventListener('click', async () =>{
  if (focusActual == null) {
    alert("Selecciona un presupuesto primero");    
  }else{
    let data = { id: focusActual };
    sessionStorage.setItem('budgetData',JSON.stringify(data));
    window.location.href = "../html/edicion.html";
  }  
});

document.getElementById('botonEliminar').addEventListener('click', async () =>{
  if (focusActual == null) {
    alert("Selecciona un presupuesto primero");    
  }else{
    if (window.confirm("¿Esta seguro de que desea eliminar el presupuesto?")) {
      let meses = await Crud.buscarMes(focusActual, token );
     for (let index = 0; index < meses.length; index++) {
       const element = meses[index];
       await Crud.eliminarMes(element.id, focusActual, token);       
     }
      let presupuesto = await Crud.eliminarPresupuesto(focusActual, usuario.id, token);
      alert(presupuesto);
      window.location.reload();
    }    
  }  
});

document.getElementById('botonEnviar').addEventListener('click', async () =>{
  if (focusActual == null) {
    alert("Selecciona un presupuesto primero");    
  }else{
    alert("Prespuesto enviado");
  }  
});