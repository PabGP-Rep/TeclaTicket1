const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/conexion');

class Usuario extends Model {}

Usuario.init({
  //Definicion de atributos del modelo
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  pass: {
    type: DataTypes.STRING,
    allowNull: false
  },

  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  //Opciones extra del modelo
  modelName: 'Usuario',
  tableName: 'Usuarios',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize,
});

module.exports = Usuario;