const {  } = require('../middlewares/index');
const { crearPresupuesto, eliminarPresupuesto, listarPresupuesto } = require('../controllers/presupuesto.controller');

module.exports = (app) => {

  app.post('/presupuesto/crear', crearPresupuesto);

  app.post('/presupuesto/eliminar', eliminarPresupuesto);

  app.get('/presupuesto/list', listarPresupuesto);

}