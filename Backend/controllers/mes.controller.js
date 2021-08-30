const Month = require('../services/mes.service');
const monthService = new Month();

const crearMes = async (req, res) => {
  const { idPresupuesto, inicial, nombre, cantidad } = req.body;
  try {
    mes = await monthService.createMonth(idPresupuesto, inicial, nombre, cantidad);
    console.log("Mes creado con exito [CONTROLLER]");
    res.status(201).json(mes);
  } catch (error) {
    return res.status(500);
  }
}

const buscarMes = async (req, res) => {
  const idPresupuesto = req.body.idPresupuesto;
  try {
    let listaMeses = await monthService.searchMonth(idPresupuesto);
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(listaMeses);
  } catch (error) {
    return res.status(500);
  }
}

const buscarMesId = async (req, res) => {
  const id = req.body.id;
  try {
    let mes = await monthService.searchMonthId(id);
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(mes);
  } catch (error) {
    return res.status(500);
  }
}

const listarMes = async (req, res) => {
  try {
    let listaMeses = await monthService.listMonth();
    console.log("Consulta exitosa [CONTROLLER]");
    res.status(200).json(listaMeses);
  } catch (error) {
    return res.status(500);
  }
}

const eliminarMes = async (req, res) =>{
  const { id, idPresupuesto } = req.body;
  try {
    let mes = await monthService.deleteMonth(id, idPresupuesto);
    console.log("Mes eliminado correctamente [CONTROLLER]");
    res.status(200).json(mes);
  } catch (error) {
    throw new Error('Error al eliminar Mes')
  }
}

module.exports = { crearMes, buscarMes, buscarMesId, listarMes, eliminarMes };