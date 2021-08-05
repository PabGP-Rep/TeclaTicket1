const { usuarioExiste } = require('../middlewares/index');
const { crearUsuario } = require('../controllers/usuario.controller');

module.exports = (app) => {

  app.post('/usuario/crear', usuarioExiste, crearUsuario);

  //app.post('/usuario/login', usuarioExiste, crearUsuario);

}