import { Usuario, Crud} from "./crud.js";

let usuario = JSON.parse(localStorage.getItem('ActiveUser'))[0].usuario;

async function mostrarPresupuestos(){
  let presupuestos = await Crud.listarPresupuestos(usuario.id);
  let tabla = document.getElementById('contenido-tabla');
  console.log(presupuestos);
  let vista = ``;
  presupuestos.forEach(element => {
    vista += `
    <tr>
      <th style="width: 10%;">${element.id}</th>
      <td style="width: 20%;">${element.fechaCreacion}</td>
      <td style="width: 20%;">${element.proyecto}</td>
      <td style="width: 20%;">${element.versionn}</td>
    </tr>
    `;
  });
  tabla.innerHTML = vista;
}

if(JSON.parse(localStorage.getItem('ActiveUser')) == null){  
  window.location.href = "../html/login.html";
}else{  
  console.log(JSON.parse(localStorage.getItem('ActiveUser')));
  document.getElementById('nombreUsuario').textContent = usuario.nombre;
  mostrarPresupuestos();  
}

document.getElementById('botonLogout').addEventListener('click', async () =>{
  localStorage.removeItem('ActiveUser');
});

document.getElementById('botonNuevo').addEventListener('click', async () =>{
  window.location.href = "../html/edicion.html";
});