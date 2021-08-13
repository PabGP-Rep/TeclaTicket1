import { Usuario } from "../js/usuario.js";

if(JSON.parse(localStorage.getItem('ActiveUser'))!=null) {  
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