export class Usuario{

  static async login(usuario) {   
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
    if (resultado.status != 200) {
      return "Error de autenticacion"      
    }else{
      console.log(resultado);
      let resultado_json = resultado.json();      
      return resultado_json;
    }   
     
  }
}

export class Crud{

  static async listarPresupuestos(id, token){
    try {
      let resultado = await fetch('http://localhost:3000/presupuesto/buscar',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json",
          "Authorization": "Bearer "+token,
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

  static async buscarPresupuestoId(id, token){
    try {
      let resultado = await fetch('http://localhost:3000/presupuesto/buscarId',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify({
          id: id
        })
      });
      let resultado_json = resultado.json();      
      return resultado_json;
      
    } catch (error) {
      console.log("error front crud");
      console.log(error);
    }
  }

  static async crearPresupuesto(idUsuario, fechaCreacion, proyecto, versionn, token){
    try {
      let resultado = await fetch('http://localhost:3000/presupuesto/crear',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify({
          idUsuario: idUsuario,
          fechaCreacion: fechaCreacion,
          proyecto: proyecto,
          versionn: versionn
        })
      });
      let resultado_json = resultado.json();      
      return resultado_json;
      
    } catch (error) {
      console.log("error front crud");
      console.log(error);
    }
  }

  static async eliminarPresupuesto(id, idUsuario, token){
    try {
      let resultado = await fetch('http://localhost:3000/presupuesto/eliminar',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify({
          id: id,
          idUsuario: idUsuario
        })
      });
      let resultado_json = resultado.json();      
      return resultado_json;
      
    } catch (error) {
      console.log("error front crud");
      console.log(error);
    }
  }

  //MESES
  static async crearMes(idPresupuesto, inicial, nombre, cantidad, token){
    try {
      let resultado = await fetch('http://localhost:3000/mes/crear',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify({
          idPresupuesto: idPresupuesto,
          inicial: inicial,
          nombre: nombre,
          cantidad: cantidad
        })
      });
      let resultado_json = resultado.json();      
      return resultado_json;
      
    } catch (error) {
      console.log("error front crud");
      console.log(error);
    }
  }

  static async buscarMes(idPresupuesto, token){
    try {
      let resultado = await fetch('http://localhost:3000/mes/buscar',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify({
          idPresupuesto: idPresupuesto
        })
      });
      let resultado_json = resultado.json();      
      return resultado_json;
      
    } catch (error) {
      console.log("error front crud");
      console.log(error);
    }
  }

  static async eliminarMes(id, idPresupuesto, token){
    try {
      let resultado = await fetch('http://localhost:3000/mes/eliminar',{
        method:'POST',
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify({
          id: id,
          idPresupuesto: idPresupuesto
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