const Usuario = require('../models/usuario.model');

class User {
  //Metodos del Servicio User
  createUser = async (nombre, pass, estado, email) => {
    try {
      console.log(nombre);
      const usuario = await Usuario.create({ nombre: nombre, pass: pass, estado: estado, email: email});
      console.log("Usuario creado con exito [SERVICE]");
      return usuario;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  searchUser = async (username, pass) => {
    try {
      let encontrado = await Usuario.findOne({
        where: { nombre: username, pass: pass }
      })
      if (encontrado != null) {
        console.log("Perfil encontrado con exito [SERVICE]");       
        return encontrado;        
      }else{
       return 'Usuario o contraseña incorrectos';
      }      
    } catch (error) {
      //console.log(error);
      return error;
    }
  }

  listUsers = async () => {
    let usuarios = await Usuario.findAll();
    console.log("Consulta exitosa [SERVICE]");
    return usuarios;  
  }  
  

}

module.exports = User;