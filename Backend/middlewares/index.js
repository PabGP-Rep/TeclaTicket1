const Joi = require('joi');
const { descubrirToken } = require('../services/jwt.service');
const { loginDTO, altaUsuarioDTO, busquedaUsuarioIdDTO, actualizacionUsuarioDTO, eliminacionUsuarioDTO } = require('../dto/usuario.dto')
const { altaPresupuestoDTO, busquedaPresupuestoDTO, eliminacionPresupuestoDTO, busquedaPresupuestoIdDTO } = require('../dto/presupuesto.dto')
const { altaMesDTO, busquedaMesDTO, busquedaMesIdDTO, eliminacionMesDTO } = require('../dto/mes.dto');

const Usuario = require('../models/usuario.model');

//TOKEN
const validarToken = async (req, res, next) => {
  try {
    console.log("Recibi:");
    console.log(req.headers);
    
    if (req.headers.authorization != undefined) {
      const token = req.headers.authorization.split(' ')[1];
      const verified = await descubrirToken(token);
      if (verified){
        console.log("token verificado:");
        console.log(verified);
        return next ();
      } 
      else{
        return res.status(403).json('No tienes Permisos');
      }
    }
    else{
      return res.status(403).json('INVALID AUTHORIZATION');
    }
    
  } catch (error) {    
    console.log(error);    
  }
}

const validarTokenAdmin = async (req, res, next) => {
  try {
    console.log("Recibi:");
    console.log(req.headers);
    
    if (req.headers.authorization != undefined) {
      const token = req.headers.authorization.split(' ')[1];
      const verified = await descubrirToken(token);
      if (verified.data.nombre == 'Admin'){
        console.log("token verificado:");
        console.log(verified);
        return next ();
      } 
      else{
        return res.status(403).json('NESECITAS PERMISO DE ADMINISTRADOR');
      }
    }
    else{
      return res.status(403).json('INVALID AUTHORIZATION');
    }
    
  } catch (error) {    
    console.log(error);    
  }
}

//Usuario
const usuarioExiste = async function(req,res,next) {
  let usuario = await Usuario.findOne(
      {where: {nombre: req.body.nombre}}
  );
  
  if (usuario != null){
    return res.status(400).json('Usuario ya registrado');    
  }else{
    return next();
  }
}

const chkDatosLogin = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, loginDTO, "Error:");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});    
  }
}

const chkDatosAlta = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, altaUsuarioDTO, "Error:");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosBusquedaId = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, busquedaUsuarioIdDTO, "Error");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosActualizacion = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, actualizacionUsuarioDTO, "Error:");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosEliminacion = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, eliminacionUsuarioDTO, "Error:");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

//Presupuesto
const chkDatosAltaPresupuesto = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, altaPresupuestoDTO, "Error:");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosBusquedaPresupuesto = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, busquedaPresupuestoDTO, "Error");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosBusquedaPresupuestoId = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, busquedaPresupuestoIdDTO, "Error");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosEliminacionPresupuesto = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, eliminacionPresupuestoDTO, "Error:");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

//Mes
const chkDatosAltaMes = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, altaMesDTO, "Error:");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosBusquedaMes = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, busquedaMesDTO, "Error");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosBusquedaMesId = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, busquedaMesIdDTO, "Error");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

const chkDatosEliminacionMes = async (req, res, next) => {
  try {
    await Joi.attempt(req.body, eliminacionMesDTO, "Error:");
    return next();    
  } catch (error) {
    res.status(500).json({error: error.message});  
  }
}

module.exports = { 
  usuarioExiste, validarToken, chkDatosLogin, chkDatosAlta, chkDatosBusquedaId,
  chkDatosActualizacion, chkDatosEliminacion, validarTokenAdmin, chkDatosAltaPresupuesto,
  chkDatosBusquedaPresupuesto, chkDatosEliminacionPresupuesto, chkDatosBusquedaPresupuestoId,
  chkDatosAltaMes, chkDatosBusquedaMes, chkDatosBusquedaMesId, chkDatosEliminacionMes
};