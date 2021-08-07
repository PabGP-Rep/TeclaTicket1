import { ResumenFinanciero, FlujoDeEfectivo, EstadoDeResultados, Ingresos } from "../js/clases.js";

let resumen = new ResumenFinanciero();
let flujo = new FlujoDeEfectivo();
let estado = new EstadoDeResultados();
let ingresos = new Ingresos();

let prespuesto = {"id": "1", "idUsuario": "1313", "Fecha": "20-08-05", "Proyecto": "ventas o algo", "version": "1.0.0"}
let mesesContemplados = [];
let conceptosIngresos = [];

resumen.crearResumenFinanciero();
flujo.crearFlujoDeEfectivo();
estado.crearEstadoDeResultados();
ingresos.crearIngresos();

const guardarPresupuesto = document.getElementById('guardarPresupuesto');
const agregarMes = document.getElementById('botonAgregarMes');
const eliminarMes = document.getElementById('botonEliminarMes');
const agregarIngreso = document.getElementById('botonAgregarIngreso');
const eliminarIngreso = document.getElementById('botonEliminarIngreso');

agregarMes.addEventListener('click', () => {
  if (mesesContemplados.length == 0) {
    do{
      var inicial = parseInt(window.prompt("Por favor ingrese el numero del mes inicial(1 a 12)", 1), 10);
    }while(isNaN(inicial) || inicial > 12 || inicial < 1);
    
    let respuesta = flujo.agregarColumnaInicial(prespuesto.id, inicial-1, 500);
    mesesContemplados.push(respuesta);

    estado.agregarColumnaInicial(inicial-1);
    console.log("ingresosColuma");
    let respIngresos = ingresos.agregarColumnaInicial(inicial-1);
    console.log(respIngresos);
    if (conceptosIngresos.length == 0) {
      conceptosIngresos.push(respIngresos);            
    } else{
      respIngresos.forEach(element => {
        conceptosIngresos[0].push(element);       
      });  
    }
    mesesContemplados.push(respuesta);
    //console.log(respuesta);  
  } else{
    let respuesta = flujo.agregarColumna(prespuesto.id, 800);
    estado.agregarColumna();
    console.log("ingresosColuma2");
    let respIngresos = ingresos.agregarColumna();
    console.log(respIngresos);
    conceptosIngresos.push(respIngresos);    
  }
  
});

eliminarMes.addEventListener('click', () => {
  flujo.eliminarColumna();
  estado.eliminarColumna();
  ingresos.eliminarColumna();
  mesesContemplados.pop();
  conceptosIngresos.pop();
});

agregarIngreso.addEventListener('click', () => {
  do{
    var concepto = window.prompt("Por favor ingrese el concepto del ingreso", "");
  }while(concepto == "");
  if (concepto != null) {
    let respuesta = ingresos.agregarFila(concepto, 0);
    console.log(respuesta);
    console.log("Pushh time");
    respuesta.forEach((element, index) => {
      if (index >= conceptosIngresos.length) {
        let array = [];
        array.push(element);
        conceptosIngresos.push(array);        
      }else{
        conceptosIngresos[index].push(element);
      }  
    });
  }  
});

eliminarIngreso.addEventListener('click', () => {  
  if (ingresos.focusActual != null) {
    //console.log("JEJEJE eliminaré: "+ingresos.focusActual);    
    conceptosIngresos.forEach(element => {
      element.forEach((elemento, index) => {
        if(elemento.concepto == ingresos.focusActual){
          element.splice(index,1);
        }        
      }); 
    });
    ingresos.eliminarFila(ingresos.focusActual);
  }
  else
    alert("selecciona un concepto de ingreso primero");  
});


guardarPresupuesto.addEventListener('click', () => {  
  //console.log(mesesContemplados);
  console.log(conceptosIngresos);
});