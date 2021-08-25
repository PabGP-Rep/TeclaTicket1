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
    const usuario = JSON.parse(JSON.stringify(await userService.loginUser(nombre, pass)));
    if (usuario == 'Usuario o contraseña incorrectos') {
      throw new Error('Usuario o contraseña incorrectos');     
    }

    const user = { "nombre": usuario.nombre, "id": usuario.id };
    delete usuario.pass;
    delete usuario.estado;
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

const buscarUsuario = async (req, res) =>{
  const id = req.body.id;
  try {
    let usuario = await userService.searchUserById(id);
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

const actualizarUsuario = async (req, res) => {
  const { id, nombre, estado, email } = req.body;
  try {
    await userService.updateUser(id, nombre, estado, email);
    console.log("Usuario actualizado con exito [CONTROLLER]");
    res.status(201).json('Usuario actualizado con Exito');
  } catch (error) {
    return res.status(500);
  }
}

const eliminarUsuario = async (req, res) =>{
  const id = req.body.id;
  try {
    await userService.deleteUser(id);
    console.log("Eliminacion exitosa [CONTROLLER]");
    res.status(200).json('Usuario Eliminado');
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

module.exports = { crearUsuario, loginUsuario, listarUsuarios, buscarUsuario, actualizarUsuario, eliminarUsuario  };