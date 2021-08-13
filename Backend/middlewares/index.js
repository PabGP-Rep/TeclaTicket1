const { listarUsuarios } = require('../controllers/usuario.controller');
const Usuario = require('../models/usuario.model');

const usuarioExiste = async function(req,res,next) {
  let listaUsuarios = await Usuario.findOne(
      {where: {nombre: req.body.nombre}}
  );
  
  if (listaUsuarios != null){
    return res.status(400).json('Usuario ya registrado');    
  }else{
    return next();
  }
}

module.exports = { usuarioExiste };