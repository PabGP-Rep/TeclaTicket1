const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const saltRounds = 5;

class User {
  //Metodos del Servicio User
  createUser = async (nombre, pass, estado, email) => {
    try {
      let hash = await bcrypt.hash(pass, saltRounds);
      const usuario = await Usuario.create({ nombre: nombre, pass: hash, estado: estado, email: email });
      console.log("Usuario creado con exito [SERVICE]");
      return usuario;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  loginUser = async (nombre, pass) => {
    try {
      let encontrado = await Usuario.findOne({
        where: { nombre: nombre }
      });

      if (encontrado != null) {
        let validacion = await bcrypt.compare(pass, encontrado.pass);
        if (validacion){
          console.log("Perfil encontrado con exito [SERVICE]");          
          return encontrado;
        }        
      }
      return 'Usuario o contraseña incorrectos';
            
    } catch (error) {
      //console.log(error);
      return error;
    }
  }

  searchUser = async (id) => {
    try {
      let encontrado = await Usuario.findOne({
        where: { id: id }
      })
      if (encontrado) {
        console.log("Perfil encontrado con exito [SERVICE]");       
        return encontrado;        
      }else{
        return [];
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

  updateUser = async (id, nombre, estado, email) => {
    try {      
      const usuario = await Usuario.update({ 
        nombre: nombre, estado: estado, email: email
      },
      {
        where: { id: id }
      }      
      );
      console.log("Usuario actualizado con exito [SERVICE]");
      return usuario;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  deleteUser = async (id) => {
    await Usuario.destroy({
      where: { id: id }
    });    
    console.log("Eliminacion exitosa [SERVICE]");
    return 0;  
  }
  

}

module.exports = User;