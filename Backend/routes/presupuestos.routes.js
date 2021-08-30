const { validarToken, chkDatosAltaPresupuesto, chkDatosEliminacionPresupuesto, validarTokenAdmin, chkDatosBusquedaPresupuesto, chkDatosBusquedaPresupuestoId } = require('../middlewares/index');
const { crearPresupuesto, eliminarPresupuesto, listarPresupuesto, buscarPresupuesto, buscarPresupuestoId } = require('../controllers/presupuesto.controller');

module.exports = (app) => {

  app.post('/presupuesto/crear', validarToken, chkDatosAltaPresupuesto, crearPresupuesto);

  app.post('/presupuesto/eliminar', validarToken, chkDatosEliminacionPresupuesto, eliminarPresupuesto);

  app.get('/presupuesto/list', validarTokenAdmin, listarPresupuesto);

  app.post('/presupuesto/buscar', validarToken, chkDatosBusquedaPresupuesto, buscarPresupuesto);

  app.post('/presupuesto/buscarId', validarToken, chkDatosBusquedaPresupuestoId, buscarPresupuestoId);

}