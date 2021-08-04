const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db/conexion');

//Rutas
const usuariosRoute = require('./routes/usuarios.routes');

//configuración de middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//levantamiento del servidor
async function initServer(){
  try {
    await sequelize.authenticate();
    console.log('Conexión con DB establecida correctamente');
    app.listen(process.env.PORT, function () {
        console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
    });    
  } catch (error) {
    console.error('No se pudo conectar correctamente con la Base de datos:', error);
  }
}

initServer();
usuariosRoute(app);