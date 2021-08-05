const { DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('../db/conexion');
const Usuario = require('./usuario.model');

class Presupuesto extends Model {}

Presupuesto.init({
  //Definicion de atributos del modelo
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references:{
      model: Usuario,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },

  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false
  },

  proyecto: {
    type: DataTypes.STRING,
    allowNull: false
  },

  version: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  //Opciones extra del modelo
  modelName: 'Presupuesto',
  tableName: 'Presupuestos',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize,
});

module.exports = Presupuesto;