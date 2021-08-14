export class Usuario{

  static async login(usuario) {
    try {
      let resultado = await fetch('http://localhost:3000/usuario/login',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          nombre: usuario.nombre,
          pass: usuario.pass
        })
      });      
      let resultado_json = resultado.json();
      //console.log(resultado_json);
      return resultado_json;
    } catch (error) {      
      console.log(error);      
    }    
  }
}

export class Crud{
  static async listarPresupuestos(id){
    try {
      let resultado = await fetch('http://localhost:3000/presupuesto/buscar',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          idUsuario: id
        })
      });
      let resultado_json = resultado.json();      
      return resultado_json;
      
    } catch (error) {
      console.log("error front crud");
      console.log(error);
    }
  }

}