const { usuarioExiste } = require('../middlewares/index');
const { crearUsuario, listarUsuarios, loginUsuario } = require('../controllers/usuario.controller');

module.exports = (app) => {

  app.post('/usuario/crear', usuarioExiste, crearUsuario);

  app.post('/usuario/login', loginUsuario);

  app.get('/usuario/list', listarUsuarios);

}