const Joi = require('joi');

module.exports.altaPresupuestoDTO = Joi.object().keys({
  idUsuario: Joi.number().integer().positive().required(),
  fechaCreacion: Joi.date().required(),
  proyecto: Joi.string().required(),
  versionn: Joi.string().max(10).required()
});

module.exports.busquedaPresupuestoDTO = Joi.object().keys({
  idUsuario: Joi.number().integer().positive().required(),
});

module.exports.busquedaPresupuestoIdDTO = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
});

module.exports.eliminacionPresupuestoDTO = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  idUsuario: Joi.number().integer().positive().required()
});