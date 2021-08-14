import { ResumenFinanciero, FlujoDeEfectivo, EstadoDeResultados, Ingresos, CostosDirectos, GastosAdministrativos, Recursos } from "../js/clases.js";

export function Calcular(a){
  //console.log("calculando valores");
  recursos.calcularValorRecursos();
  recursos.calcularValorCostos();
  recursos.calcularValorResumen();

  gastos.calcularValor();
  costos.calcularValor();
  ingresos.calcularValor();
  estado.calcularValor();
  flujo.calcularValor();
  resumen.calcularValor();
}
/*
Instanciacion de los objetos definidos en clases.js
pertenecientes a cada seccion del ticket
*/
let resumen = new ResumenFinanciero();
let flujo = new FlujoDeEfectivo();
let estado = new EstadoDeResultados();
let ingresos = new Ingresos();
let costos = new CostosDirectos();
let gastos = new GastosAdministrativos();
let recursos = new Recursos();

//ejemplo de Json que se enviara al Back-End
let prespuesto = {"id": "1", "idUsuario": "1313", "Fecha": "20-08-05", "Proyecto": "ventas o algo", "version": "1.0.0"}

//Arreglo unidimencional de Json de los meses en el presupuesto
let mesesContemplados = [];

//Arreglos Bidimencionales de Json de los conceptos o roles pertenecientes a cada mes del presupuesto
let conceptosIngresos = [];
let conceptosCostos = [];
let conceptosGastos = [];
let rolesRecursos = [];

//llamada a metodos de creacion encargados de crear el codigo html inicial de cada seccion
resumen.crearResumenFinanciero();
flujo.crearFlujoDeEfectivo();
estado.crearEstadoDeResultados();
ingresos.crearIngresos();
costos.crearCostosDirectos();
gastos.crearGastosAdministrativos();
recursos.crearRecursos();
Calcular(); 

//Guardado de los botones para posteriormente agregarles el event listener
const guardarPresupuesto = document.getElementById('guardarPresupuesto');
const eliminarPresupuesto = document.getElementById('eliminarPresupuesto');
const agregarMes = document.getElementById('botonAgregarMes');
const eliminarMes = document.getElementById('botonEliminarMes');
const agregarIngreso = document.getElementById('botonAgregarIngreso');
const eliminarIngreso = document.getElementById('botonEliminarIngreso');
const agregarCosto = document.getElementById('botonAgregarCosto');
const eliminarCosto = document.getElementById('botonEliminarCosto');
const agregarGasto = document.getElementById('botonAgregarGasto');
const eliminarGasto = document.getElementById('botonEliminarGasto');
const agregarRecurso = document.getElementById('botonAgregarRecurso');
const eliminarRecurso = document.getElementById('botonEliminarRecurso');


//Event listener encargado de agregar meses a las tablas de todas las secciones
agregarMes.addEventListener('click', () => {
  //Si el array de meses esta vacio se solicita uno inicial
  if (mesesContemplados.length == 0) {
    do{
      var inicial = parseInt(window.prompt("Por favor ingrese el numero del mes inicial(1 a 12)", 1), 10);
    }while(isNaN(inicial) || inicial > 12 || inicial < 1);


    //modificacion del DOM de la seccion flujo de efectivo
    let respuesta = flujo.agregarColumnaInicial(prespuesto.id, inicial-1, 500);
    //guardado del archivo Json del mes generado
    mesesContemplados.push(respuesta);

    //modificacion del DOM de la seccion Estado de Resultados
    estado.agregarColumnaInicial(inicial-1);

    //modificacion del DOM de la seccion Ingresos
    let respIngresos = ingresos.agregarColumnaInicial(inicial-1);
    
    //guardado de los archivos Json de los conceptos de Ingresos generados    
    if (conceptosIngresos.length == 0) {
      //Si el array esta vacio se hace push con el arreglo completo que regresa la funcion
      conceptosIngresos.push(respIngresos);            
    } else{
      //Si hay un arreglo dentro del arreglo se hace push al arreglo existente con cada elemento
      //del arreglo que regresa la funcion
      respIngresos.forEach(element => {
        conceptosIngresos[0].push(element);       
      });  
    }

    //modificacion del DOM de la seccion Costos Directos
    let respCostos = costos.agregarColumnaInicial(inicial-1, costos.opcionActual);

    //guardado de los archivos Json de los conceptos de Costos generados   
    if (conceptosCostos.length == 0) {
      //Si el array esta vacio se hace push con el arreglo completo que regresa la funcion
      conceptosCostos.push(respCostos);            
    } else{
      //Si hay un arreglo dentro del arreglo se hace push al arreglo existente con cada elemento
      //del arreglo que regresa la funcion
      respCostos.forEach(element => {
        conceptosCostos[0].push(element);       
      });  
    }

    //modificacion del DOM de la seccion Gastos Administrativos
    let respGastos = gastos.agregarColumnaInicial(inicial-1, gastos.opcionActual);

    //guardado de los archivos Json de los conceptos de Gastos generados
    if (conceptosGastos.length == 0) {
      //Si el array esta vacio se hace push con el arreglo completo que regresa la funcion
      conceptosGastos.push(respGastos);            
    } else{
      //Si hay un arreglo dentro del arreglo se hace push al arreglo existente con cada elemento
      //del arreglo que regresa la funcion
      respGastos.forEach(element => {
        conceptosGastos[0].push(element);       
      });  
    }

    //modificacion del DOM de la seccion Asignacion de Recursos
    let respRecursos = recursos.agregarColumnaInicial(inicial-1);

    //guardado de los archivos Json de los conceptos de Recursos generados
    if (rolesRecursos.length == 0) {
      //Si no hay arreglos dentro del arreglo se hace push con el arreglo completo que regresa la funcion
      rolesRecursos.push(respRecursos);            
    } else{
      //Si hay un arreglo dentro del arreglo se hace push al arreglo existente con cada elemento
      //del arreglo que regresa la funcion
      respRecursos.forEach(element => {
        rolesRecursos[0].push(element);       
      });  
    }    
  } 
   //Si el array de meses no esta vacio se agregan los meses posteriores al inicial 
  else{

    //Sucede lo mismo que cuando se agrega la primera columna, solo que
    //esta vez esta asegurado que los arreglos de Json para la columna
    //que se acaba de crear no existe y se puede hacer push con el arreglo
    //completo en cada ocación

    let respuesta = flujo.agregarColumna(prespuesto.id, 800);
    mesesContemplados.push(respuesta);

    estado.agregarColumna();
    
    let respIngresos = ingresos.agregarColumna();    
    conceptosIngresos.push(respIngresos);

    
    let respCostos = costos.agregarColumna(costos.opcionActual); 
    conceptosCostos.push(respCostos);

    
    let respGastos = gastos.agregarColumna(gastos.opcionActual);
    conceptosGastos.push(respGastos);

   
    let respRecursos = recursos.agregarColumna();
    rolesRecursos.push(respRecursos);

  }
  Calcular();  
});

//Eliminacin de columnas
eliminarMes.addEventListener('click', () => {

  if (window.confirm("¿Esta seguro de que desea eliminar la columna?")) {
    //Eliminacion de columna en cad parte del DOM
    flujo.eliminarColumna();
    estado.eliminarColumna();
    ingresos.eliminarColumna();
    costos.eliminarColumna();
    gastos.eliminarColumna();
    recursos.eliminarColumna();
    //Eliminacion de columna en cada array correspondiente
    mesesContemplados.pop();
    conceptosIngresos.pop();
    conceptosCostos.pop();
    conceptosGastos.pop();
    rolesRecursos.pop();
    //Calculo de nuevos valores tras eliminacion de columna
    Calcular();
  }  
});


//creacion de una fila correspondiente a un ingreso
agregarIngreso.addEventListener('click', () => {
  //Solicitud del nombre del concepto
  do{
    var concepto = window.prompt("Por favor ingrese el concepto del ingreso", "");
  }while(concepto == "");

  if (concepto != null) {
    //Creacion de fila en DOM
    let respuesta = ingresos.agregarFila(concepto, 0);

    //agregacion de los Json al arreglo bidimencional
    respuesta.forEach((element, index) => {
      //Si no existe un arreglo en el indice de elemento se crea un arreglo y se hace push
      //con el elemento dentro
      if (index >= conceptosIngresos.length) {
        let array = [];
        array.push(element);
        conceptosIngresos.push(array);
        //Si ya hay un arreglo en ese numero de indice se hace push con solo el elemento     
      }else{
        conceptosIngresos[index].push(element);
      }  
    });
  }
  Calcular();  
});

//eliminacion de una fila correspondiente a un ingreso
eliminarIngreso.addEventListener('click', () => { 

  if (window.confirm("¿Esta seguro de que desea eliminar el ingreso?")) {
    //Si ya se selecciono un ingreso en la tabla se elimina dicha seleccion
    if (ingresos.focusActual != null) { 
      //Eliminacion del elemento Json correspondiente en cada arreglo de Jsons
      conceptosIngresos.forEach(element => {
        element.forEach((elemento, index) => {
          if(elemento.concepto == ingresos.focusActual){
            element.splice(index,1);
          }        
        }); 
      });
      //Eliminacion de la fila seleccionada en el DOM
      ingresos.eliminarFila(ingresos.focusActual);
    }
    //si no, se solicita seleccionar un ingreso de la tabla
    else
      alert("selecciona un concepto de ingreso primero");  

    //Calculo de valores tras eliminacion del ingreso
    Calcular();       
  }  
});

//creacion de una fila correspondiente a un costo
agregarCosto.addEventListener('click', () => {
  do{
    var concepto = window.prompt("Por favor ingrese el concepto del costo", "");
  }while(concepto == "");

  if (costos.opcionActual == 3) {
    do{
      var porcentaje = window.prompt("Por favor ingrese el porcentaje", "");
    }while(isNaN(porcentaje) || porcentaje < 1 || porcentaje > 100);    
  }else{ 
    var porcentaje = 0;
  }


  if (concepto != null && porcentaje != null) {
    if (costos.opcionActual != null) {
      let respuesta = costos.agregarFila(concepto, costos.opcionActual, 0, porcentaje);      
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
  Calcular(); 
});

//eliminacion de una fila correspondiente a un costo
eliminarCosto.addEventListener('click', () => {

  if (window.confirm("¿Esta seguro de que desea eliminar el costo?")) {
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
    
    //Calculo de valores tras eliminacion de costo
    Calcular();    
  }  
});

//creacion de una fila correspondiente a un gasto
agregarGasto.addEventListener('click', () => {
  do{
    var concepto = window.prompt("Por favor ingrese el concepto del gasto", "");
  }while(concepto == "");

  if (gastos.opcionActual == 3) {
    do{
      var porcentaje = window.prompt("Por favor ingrese el porcentaje", "");
    }while(isNaN(porcentaje) || porcentaje < 1 || porcentaje > 100);    
  }else{ 
    var porcentaje = 0;
  }

  if (concepto != null && porcentaje != null) {
    if (gastos.opcionActual != null) {
      let respuesta = gastos.agregarFila(concepto, gastos.opcionActual, 0, porcentaje);
      
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
  Calcular();   
});

//eliminacion de una fila correspondiente a un gasto
eliminarGasto.addEventListener('click', () => {

  if (window.confirm("¿Esta seguro de que desea eliminar el gasto?")) {
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
    
    //Calculo de valores tras eliminacion de gasto  
    Calcular();    
  }  
});

//creacion de una fila correspondiente a un recurso
agregarRecurso.addEventListener('click', () => {
  do{
    var rol = window.prompt("Por favor ingrese el rol del recurso", "");
    var costo = parseInt(window.prompt("Por favor ingrese costo mensual del recurso", 1), 10);    
  }while( (rol == "") || (isNaN(costo) || costo < 0) );
  if (rol != null) {  
    let respuesta = recursos.agregarFila(rol, costo);
   
    respuesta.forEach((element, index) => {
      if (index >= rolesRecursos.length) {
        let array = [];
        array.push(element);
        rolesRecursos.push(array);        
      }else{
        rolesRecursos[index].push(element);
      }  
    });
    
  }

  Calcular(); 
});

//eliminacion de una fila correspondiente a un recurso
eliminarRecurso.addEventListener('click', () => {
  if (window.confirm("¿Esta seguro de que desea eliminar el recurso?")) {
    if (recursos.focusActual != null) {
      rolesRecursos.forEach(element => {
        element.forEach((elemento, index) => {
          if(elemento.rol == recursos.focusActual){
            element.splice(index,1);
          }
        }); 
      });
      recursos.eliminarFila(recursos.focusActual);
    }
    else
      alert("selecciona un rol de recurso primero");  
    
      //Calculo de valores tras eliminacion de recurso
    Calcular();    
  }  
});


//Proceso de guardado en la base de datos mediante API
guardarPresupuesto.addEventListener('click', () => {
  console.log(mesesContemplados);
  //console.log(conceptosIngresos);
  //console.log(conceptosCostos);
  //console.log(conceptosGastos);
  //console.log(rolesRecursos);
});


//Funcionalidad de calculo de valores en cada tabla (TEMPORAL)
eliminarPresupuesto.addEventListener('click', () => { 
  //recursos.guardarValor(rolesRecursos);
  //gastos.guardarValor(conceptosGastos);
  //costos.guardarValor(conceptosCostos);
  //ingresos.guardarValor(conceptosIngresos);
  flujo.guardarValor(mesesContemplados, "abcdadw");
  
});


document.getElementById('botonLogout').addEventListener('click', async () =>{
  localStorage.removeItem('ActiveUser');
});

document.getElementById('botonPresupuestos').addEventListener('click', async () =>{
  window.location.href = "../html/main.html";
});