const Presupuesto = require('../models/presupuesto.model');

class Budget {

  createBudget = async (idUsuario, fechaCreacion, proyecto, versionn) => {
    try {
      const presupuesto = await Presupuesto.create({ 
        idUsuario: idUsuario, fechaCreacion: fechaCreacion, proyecto: proyecto, versionn: versionn });
      console.log("Presupuesto creado con exito [SERVICE]");
      return presupuesto;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  searchBudget = async (idUsuario) => {
    try {
      let encontrado = await Presupuesto.findAll({ where: { idUsuario: idUsuario } });
      console.log("Perfil encontrado con exito [SERVICE]");       
      return encontrado;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  searchBudgetId = async (id) => {
    try {
      let encontrado = await Presupuesto.findOne({ where: { id: id } });
      console.log("Perfil encontrado con exito [SERVICE]");
      return encontrado;
    } catch (error) {
      console.log(error);
      return error;
    }
  } 

  listBudget = async () => {
    let presupuestos = await Presupuesto.findAll();
    console.log("Consulta exitosa [SERVICE]");
    return presupuestos;  
  } 

  deleteBudget = async (id, idUsuario) => {
    try { 
      await Presupuesto.destroy({
        where: { 
          id: id,
          idUsuario: idUsuario          
        }  
      });  
      console.log("Presupuesto eliminado con exito [SERVICE]");
      return "Presupuesto eliminado con exito [SERVICE]";
    } catch (error) {
      console.log("ERRRORRRRRRRRRRR");
      console.log(error);
      return error;
    }  
  }
}

module.exports = Budget;