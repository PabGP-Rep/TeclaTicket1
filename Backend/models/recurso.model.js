const { DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('../db/conexion');
const Mes = require('./mes.model');

class Recurso extends Model {}

Recurso.init({
  //Definicion de atributos del modelo
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  idMes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references:{
      model: Mes,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },

  rol: {
    type: DataTypes.STRING,
    allowNull: false
  },

  porcentaje: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  costo: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  //Opciones extra del modelo
  modelName: 'Recurso',
  tableName: 'Recursos',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize,
});

module.exports = Recurso;