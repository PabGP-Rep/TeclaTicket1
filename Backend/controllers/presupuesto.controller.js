const Budget = require('../services/presupuesto.service');

const budgetService = new Budget();

const crearPresupuesto = async (req, res) => {
  const { idUsuario, fechaCreacion, proyecto, versionn } = req.body;
  try {
    await budgetService.createBudget(idUsuario, fechaCreacion, proyecto, versionn);
    console.log("Presupuesto creado con exito [CONTROLLER]");
    res.status(201).json('Presupuesto creado con Exito');
  } catch (error) {
    return res.status(500);
  }
}

const buscarPresupuesto = async (req, res) => {
  const idUsuario = req.body.idUsuario;
  try {
    let listaPresupuestos = await budgetService.searchBudget(idUsuario);
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(listaPresupuestos);
  } catch (error) {
    return res.status(500);
  }
}

const listarPresupuesto = async (req, res) => {
  try {
    let listaPresupuestos = await budgetService.listBudget();
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(listaPresupuestos);
  } catch (error) {
    return res.status(500);
  }
}

const eliminarPresupuesto = async (req, res) =>{
  const { id, idUsuario, fechaCreacion, proyecto, versionn } = req.body;
  try {
    let presupuesto = await budgetService.deleteBudget(id, idUsuario, fechaCreacion, proyecto, versionn);
    console.log("Presupuesto eliminado correctamente [CONTROLLER]");
    res.status(200).json(presupuesto);
  } catch (error) {
    throw new Error('Error al eliminar Presupuesto')
  }
}

module.exports = { crearPresupuesto, buscarPresupuesto, listarPresupuesto, eliminarPresupuesto };