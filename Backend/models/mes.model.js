const { DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('../db/conexion');
const Presupuesto = require('./presupuesto.model');

class Mes extends Model {}

Mes.init({
  //Definicion de atributos del modelo
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  idPresupuesto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references:{
      model: Presupuesto,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },

  inicial: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  cantidad: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false
  }
}, {
  //Opciones extra del modelo
  modelName: 'Mes',
  tableName: 'Meses',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize,
});

//Mes.belongsTo(Presupuesto, {foreignKey: '', onDelete: 'CASCADE'} );

module.exports = Mes;