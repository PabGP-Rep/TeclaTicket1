const Joi = require('joi');

module.exports.loginDTO = Joi.object().keys({
  nombre: Joi.string().required(),
  pass: Joi.string().required()
});

module.exports.altaUsuarioDTO = Joi.object().keys({
  nombre: Joi.string().required(),
  pass: Joi.string().required(),
  estado: Joi.string().required(),
  email: Joi.string().email().required()
});

module.exports.busquedaUsuarioIdDTO = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
});

module.exports.actualizacionUsuarioDTO = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  nombre: Joi.string().required(),  
  estado: Joi.string().required(),
  email: Joi.string().email().required()
});

module.exports.eliminacionUsuarioDTO = Joi.object().keys({
  id: Joi.number().integer().positive().required()
});