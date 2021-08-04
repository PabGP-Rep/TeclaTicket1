const Usuario = require('../models/usuario.model');

const usuarioExiste = async function(req,res,next) {
  let listaUsuarios = await Usuario.findAll(
      {where: {nombre: req.body.nombre}}
  );
  if(listaUsuarios.length > 0) {
    return res.status(400).json('Usuario ya registrado')
  }
  return next();
}

module.exports = { usuarioExiste };