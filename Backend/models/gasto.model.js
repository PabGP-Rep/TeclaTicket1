const { DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('../db/conexion');
const Mes = require('./mes.model');

class Gasto extends Model {}

Gasto.init({
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

  concepto: {
    type: DataTypes.STRING,
    allowNull: false
  },

  opcion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  cantidad: {
    type: DataTypes.FLOAT,
    allowNull: true
  },

  opcionDos: {
    type: DataTypes.STRING,
    allowNull: true
  },

  opcionTres: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  //Opciones extra del modelo
  modelName: 'Gasto',
  tableName: 'Gastos',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize,
});

module.exports = Gasto;