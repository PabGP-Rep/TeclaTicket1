const User = require('../services/usuario.service');
//const {generarToken} = require('../Services/jwt.service')
const userService = new User();

const crearUsuario = async (req, res) => {
  const { nombre, pass, estado, email } = req.body;
  try {
    await userService.createUser(nombre, pass, estado, email);
    console.log("Usuario creado con exito [CONTROLLER]");
    res.status(201).json('Usuario registrado');
  } catch (error) {
    return res.status(500);
  }
}

module.exports = { crearUsuario };