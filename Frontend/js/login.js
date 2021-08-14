import { Usuario } from "./crud.js";

if(JSON.parse(localStorage.getItem('ActiveUser'))!=null && JSON.parse(localStorage.getItem('ActiveUser')) != undefined ) { 
  console.log("Use esta logeado");
  window.location.href = "../html/main.html";  
}else{
  console.log("Aun no estas logeado");
}

document.getElementById('botonLogin').addEventListener('click', async () =>{
  let username = document.getElementById('userName').value;
  let pass = document.getElementById('userPass').value;
  let usuario = await Usuario.login({ "nombre": username, "pass": pass });
  if (usuario == 'Usuario o contraseña incorrectos') {
    let message = document.getElementById('errorMessage');
    message.style.color = 'red';
    message.style.backgroundColor = 'darkblue';
    message.textContent = usuario;    
  }
  else{
    localStorage.setItem('ActiveUser',JSON.stringify(usuario));
    window.location.href = "../html/main.html";
  }
  
});