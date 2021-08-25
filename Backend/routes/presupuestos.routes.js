const {  } = require('../middlewares/index');
const { crearPresupuesto, eliminarPresupuesto, listarPresupuesto, buscarPresupuesto } = require('../controllers/presupuesto.controller');

module.exports = (app) => {

  app.post('/presupuesto/crear', crearPresupuesto);

  app.post('/presupuesto/eliminar', eliminarPresupuesto);

  app.get('/presupuesto/list', listarPresupuesto);

  app.post('/presupuesto/buscar', buscarPresupuesto);

}