import { ResumenFinanciero, FlujoDeEfectivo, EstadoDeResultados, Ingresos } from "../js/clases.js";

let resumen = new ResumenFinanciero();
let flujo = new FlujoDeEfectivo();
let estado = new EstadoDeResultados();
let ingresos = new Ingresos();

let prespuesto = {"id": "1", "idUsuario": "1313", "Fecha": "20-08-05", "Proyecto": "ventas o algo", "version": "1.0.0"}
let mesesContemplados = [];
let conceptosIngresos = [[]];

resumen.crearResumenFinanciero();
flujo.crearFlujoDeEfectivo();
estado.crearEstadoDeResultados();
ingresos.crearIngresos();

const agregarMes = document.getElementById('botonAgregarMes');
const eliminarMes = document.getElementById('botonEliminarMes');
const agregarIngreso = document.getElementById('botonAgregarIngreso');

agregarMes.addEventListener('click', () => {
  if (mesesContemplados.length == 0) {
    do{
      var inicial = parseInt(window.prompt("Por favor ingrese el numero del mes inicial(1 a 12)", 1), 10);
    }while(isNaN(inicial) || inicial > 12 || inicial < 1);
    
    let respuesta = flujo.agregarColumnaInicial(prespuesto.id, inicial-1, 500);
    estado.agregarColumnaInicial(inicial-1);
    ingresos.agregarColumnaInicial(inicial-1);
    mesesContemplados.push(respuesta);
    //console.log(respuesta);  
  } else{
    let respuesta = flujo.agregarColumna(prespuesto.id, 800);
    estado.agregarColumna();
    ingresos.agregarColumna();
    mesesContemplados.push(respuesta);
    //console.log(respuesta);  
  }
  
});

eliminarMes.addEventListener('click', () => {
  flujo.eliminarColumna();
  estado.eliminarColumna();
  ingresos.eliminarColumna();
  mesesContemplados.pop();
});

agregarIngreso.addEventListener('click', () => {
  ingresos.agregarFila();
});

