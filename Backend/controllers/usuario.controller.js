const User = require('../services/usuario.service');
const {generarToken} = require('../Services/jwt.service');
const userService = new User();

const crearUsuario = async (req, res) => {
  const { nombre, pass, estado, email } = req.body;
  try {
    await userService.createUser(nombre, pass, estado, email);
    console.log("Usuario creado con exito [CONTROLLER]");
    res.status(201).json('Usuario registrado con Exito');
  } catch (error) {
    return res.status(500);
  }
}

const loginUsuario = async (req, res) =>{
  const { nombre, pass } = req.body;
  try {
    const usuario = await userService.searchUser(nombre, pass);
    if (usuario == 'Usuario o contraseña incorrectos') {
      throw new Error('Usuario o contraseña incorrectos');      
    }

    const user = await { "nombre": usuario.nombre, "id": usuario.id };
    console.log(user);
    const token = await generarToken(user);
    const respuesta = [{usuario}, {token}]
    console.log("Perfil encontrado con exito [CONTROLLER]");
    res.status(200).json(respuesta);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const listarUsuarios = async (req, res) =>{
  try {
    let listaUsuarios = await userService.listUsers();
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(listaUsuarios);
  } catch (error) {
    return res.status(500);
  }
}

module.exports = { crearUsuario, loginUsuario, listarUsuarios };