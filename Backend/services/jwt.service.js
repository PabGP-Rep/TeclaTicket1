const jwt = require('jsonwebtoken');

const generarToken = async (payload) => {
  const token = jwt.sign(
    { data: payload }, process.env.JWT_SEED,
    { expiresIn: '24h' }
  )
  console.log("token generado");
  return token;
}

const descubrirToken = async (token) => {
  const resultado = jwt.verify(token, process.env.JWT_SEED);
  if (resultado){   
    return resultado;    
  } else {
    throw new Error('Token no valido');
  }  
}

module.exports = { generarToken, descubrirToken};