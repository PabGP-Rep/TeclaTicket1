const Budget = require('../services/presupuesto.service');
const budgetService = new Budget();

const crearPresupuesto = async (req, res) => {
  const { idUsuario, fechaCreacion, proyecto, versionn } = req.body;
  try {
    presupuesto = await budgetService.createBudget(idUsuario, fechaCreacion, proyecto, versionn);
    console.log("Presupuesto creado con exito [CONTROLLER]");
    res.status(201).json(presupuesto);
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

const buscarPresupuestoId = async (req, res) => {
  const id = req.body.id;
  try {
    let presupuesto = await budgetService.searchBudgetId(id);
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(presupuesto);
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
  const { id, idUsuario } = req.body;
  try {
    let presupuesto = await budgetService.deleteBudget(id, idUsuario);
    console.log("Presupuesto eliminado correctamente [CONTROLLER]");
    res.status(200).json(presupuesto);
  } catch (error) {
    throw new Error('Error al eliminar Presupuesto')
  }
}

module.exports = { crearPresupuesto, buscarPresupuesto, buscarPresupuestoId, listarPresupuesto, eliminarPresupuesto };