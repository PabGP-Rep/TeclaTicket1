const { validarToken, validarTokenAdmin, chkDatosAltaMes, chkDatosEliminacionMes, chkDatosBusquedaMes, chkDatosBusquedaMesId } = require('../middlewares/index');
const { listarMes, crearMes, eliminarMes, buscarMes, buscarMesId } = require('../controllers/mes.controller');

module.exports = (app) => {

  app.post('/mes/crear', validarToken, chkDatosAltaMes, crearMes);

  app.post('/mes/eliminar', validarToken, chkDatosEliminacionMes, eliminarMes);

  app.get('/mes/list', validarTokenAdmin, listarMes);

  app.post('/mes/buscar', validarToken, chkDatosBusquedaMes, buscarMes);

  app.post('/mes/buscarId', validarToken, chkDatosBusquedaMesId, buscarMesId);

}