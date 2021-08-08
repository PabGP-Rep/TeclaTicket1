import { ResumenFinanciero, FlujoDeEfectivo, EstadoDeResultados, Ingresos, CostosDirectos, GastosAdministrativos } from "../js/clases.js";

let resumen = new ResumenFinanciero();
let flujo = new FlujoDeEfectivo();
let estado = new EstadoDeResultados();
let ingresos = new Ingresos();
let costos = new CostosDirectos();
let gastos = new GastosAdministrativos();

let prespuesto = {"id": "1", "idUsuario": "1313", "Fecha": "20-08-05", "Proyecto": "ventas o algo", "version": "1.0.0"}
let mesesContemplados = [];
let conceptosIngresos = [];
let conceptosCostos = [];
let conceptosGastos = [];

resumen.crearResumenFinanciero();
flujo.crearFlujoDeEfectivo();
estado.crearEstadoDeResultados();
ingresos.crearIngresos();
costos.crearCostosDirectos();
gastos.crearGastosAdministrativos();

const guardarPresupuesto = document.getElementById('guardarPresupuesto');
const agregarMes = document.getElementById('botonAgregarMes');
const eliminarMes = document.getElementById('botonEliminarMes');
const agregarIngreso = document.getElementById('botonAgregarIngreso');
const eliminarIngreso = document.getElementById('botonEliminarIngreso');
const agregarCosto = document.getElementById('botonAgregarCosto');
const eliminarCosto = document.getElementById('botonEliminarCosto');
const agregarGasto = document.getElementById('botonAgregarGasto');
const eliminarGasto = document.getElementById('botonEliminarGasto');

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

    console.log("costosColuma");
    let respCostos = costos.agregarColumnaInicial(inicial-1, costos.opcionActual);
    console.log(respCostos);
    if (conceptosCostos.length == 0) {
      conceptosCostos.push(respCostos);            
    } else{
      respCostos.forEach(element => {
        conceptosCostos[0].push(element);       
      });  
    }

    console.log("gastosColuma");
    let respGastos = gastos.agregarColumnaInicial(inicial-1, gastos.opcionActual);
    console.log(respGastos);
    if (conceptosGastos.length == 0) {
      conceptosGastos.push(respGastos);            
    } else{
      respGastos.forEach(element => {
        conceptosGastos[0].push(element);       
      });  
    }

    
  } else{
    let respuesta = flujo.agregarColumna(prespuesto.id, 800);
    mesesContemplados.push(respuesta);

    estado.agregarColumna();

    //console.log("ingresosColuma2");
    let respIngresos = ingresos.agregarColumna();
    //console.log(respIngresos);
    conceptosIngresos.push(respIngresos);

    //console.log("costosColuma2");
    let respCostos = costos.agregarColumna(costos.opcionActual);
    //console.log(respCostos);
    conceptosCostos.push(respCostos);

    //console.log("gastosColuma2");
    let respGastos = gastos.agregarColumna(gastos.opcionActual);
    //console.log(respGastos);
    conceptosGastos.push(respGastos);

  }
  
});

eliminarMes.addEventListener('click', () => {
  flujo.eliminarColumna();
  estado.eliminarColumna();
  ingresos.eliminarColumna();
  costos.eliminarColumna();
  gastos.eliminarColumna();
  mesesContemplados.pop();
  conceptosIngresos.pop();
  conceptosCostos.pop();
  conceptosGastos.pop();
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

agregarCosto.addEventListener('click', () => {
  do{
    var concepto = window.prompt("Por favor ingrese el concepto del costo", "");
  }while(concepto == "");
  if (concepto != null) {
    if (costos.opcionActual != null) {
      let respuesta = costos.agregarFila(concepto, costos.opcionActual, 0);
      console.log(respuesta);
      console.log("Pushh time costos");
      respuesta.forEach((element, index) => {
        if (index >= conceptosCostos.length) {
          let array = [];
          array.push(element);
          conceptosCostos.push(array);        
        }else{
          conceptosCostos[index].push(element);
        }  
      });
    }else{
      alert("Primero selecciona una opcion");
    }    
  }  
});

eliminarCosto.addEventListener('click', () => {  
  if (costos.focusActual != null) {  
    conceptosCostos.forEach(element => {
      element.forEach((elemento, index) => {
        if(elemento.concepto == costos.focusActual){
          element.splice(index,1);
        }        
      }); 
    });
    costos.eliminarFila(costos.focusActual);
  }
  else
    alert("selecciona un concepto de costo primero");  
});

agregarGasto.addEventListener('click', () => {
  do{
    var concepto = window.prompt("Por favor ingrese el concepto del gasto", "");
  }while(concepto == "");
  if (concepto != null) {
    if (gastos.opcionActual != null) {
      let respuesta = gastos.agregarFila(concepto, gastos.opcionActual, 0);
      console.log(respuesta);
      console.log("Pushh time gastos");
      respuesta.forEach((element, index) => {
        if (index >= conceptosGastos.length) {
          let array = [];
          array.push(element);
          conceptosGastos.push(array);        
        }else{
          conceptosGastos[index].push(element);
        }  
      });
    }else{
      alert("Primero selecciona una opcion");
    }    
  }  
});

eliminarGasto.addEventListener('click', () => {  
  if (gastos.focusActual != null) {  
    conceptosGastos.forEach(element => {
      element.forEach((elemento, index) => {
        if(elemento.concepto == gastos.focusActual){
          element.splice(index,1);
        }
      }); 
    });
    gastos.eliminarFila(gastos.focusActual);
  }
  else
    alert("selecciona un concepto de gasto primero");  
});

guardarPresupuesto.addEventListener('click', () => { 

  //console.log(mesesContemplados);
  //console.log(conceptosIngresos);
  //console.log(conceptosCostos);
  console.log(conceptosGastos);
});