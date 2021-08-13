import { Usuario } from "../js/usuario.js";

if(JSON.parse(localStorage.getItem('ActiveUser')) == null){  
  window.location.href = "../html/login.html";
  //alert("Primero debes iniciar sesion")
}else{
  console.log(JSON.parse(localStorage.getItem('ActiveUser')));
  document.getElementById('nombreUsuario').textContent = JSON.parse(localStorage.getItem('ActiveUser'))[0].usuario.nombre;
  
}

document.getElementById('botonLogout').addEventListener('click', async () =>{
  localStorage.removeItem('ActiveUser');
});