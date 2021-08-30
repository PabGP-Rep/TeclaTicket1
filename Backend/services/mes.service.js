const Mes = require('../models/mes.model');

class Month {

  createMonth = async (idPresupuesto, inicial, nombre, cantidad) => {
    try {
      const mes = await Mes.create({ 
        idPresupuesto: idPresupuesto, inicial: inicial, nombre: nombre, cantidad: cantidad });
      console.log("Mes creado con exito [SERVICE]");
      return mes;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  searchMonth = async (idPresupuesto) => {
    try {
      let encontrado = await Mes.findAll({ where: { idPresupuesto: idPresupuesto } });
      console.log("Mes encontrado con exito [SERVICE]");       
      return encontrado;      
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  searchMonthId = async (id) => {
    try {
      let encontrado = await Mes.findOne({ where: { id: id } });
      console.log("Mes encontrado con exito [SERVICE]");
      return encontrado;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  listMonth = async () => {
    let meses = await Mes.findAll();
    console.log("Consulta exitosa [SERVICE]");
    return meses;  
  }

  deleteMonth = async (id, idPresupuesto) => {
    try { 
      await Mes.destroy({
        where: { 
          id: id,
          idPresupuesto: idPresupuesto          
        }  
      });  
      console.log("Mes eliminado con exito [SERVICE]");
      return "Mes eliminado con exito [SERVICE]";
    } catch (error) {
      console.log("ERRRORRRRRRRRRRR");
      console.log(error);
      return error;
    }  
  }

}

module.exports = Month;