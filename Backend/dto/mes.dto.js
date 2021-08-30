const Joi = require('joi');

module.exports.altaMesDTO = Joi.object().keys({
  idPresupuesto: Joi.number().integer().positive().required(),
  inicial: Joi.boolean().required(),
  nombre: Joi.string().required(),
  cantidad: Joi.number().required()
});

module.exports.busquedaMesDTO = Joi.object().keys({
  idPresupuesto: Joi.number().integer().positive().required(),
});

module.exports.busquedaMesIdDTO = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
});

module.exports.eliminacionMesDTO = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  idPresupuesto: Joi.number().integer().positive().required()
});