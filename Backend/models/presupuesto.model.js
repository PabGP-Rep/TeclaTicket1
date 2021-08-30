const { DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('../db/conexion');
const Mes = require('./mes.model');
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
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  proyecto: {
    type: DataTypes.STRING,
    allowNull: false
  },

  versionn: {
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

//Presupuesto.belongsTo(Usuario, {foreignKey: 'idUsuario', onDelete: 'CASCADE'} );
//Presupuesto.hasMany(Mes, {foreignKey: 'idPresupuesto', onDelete: 'CASCADE'});

module.exports = Presupuesto;