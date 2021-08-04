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
}

module.exports = User;