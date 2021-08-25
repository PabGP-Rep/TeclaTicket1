const { usuarioExiste, chkDatosLogin, chkDatosBusquedaId, chkDatosActualizacion, chkDatosEliminacion, chkDatosAlta, validarTokenAdmin, validarToken } = require('../middlewares/index');
const { crearUsuario, listarUsuarios, loginUsuario, buscarUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario.controller');

module.exports = (app) => {

  app.post('/usuario/create', usuarioExiste, chkDatosAlta, crearUsuario);

  app.post('/usuario/login', chkDatosLogin, loginUsuario);

  app.get('/usuario/list', validarTokenAdmin, listarUsuarios);

  app.post('/usuario/search', validarTokenAdmin, chkDatosBusquedaId, buscarUsuario);

  app.post('/usuario/update', validarToken, chkDatosActualizacion, actualizarUsuario);

  app.post('/usuario/delete', validarToken, chkDatosEliminacion, eliminarUsuario);
}