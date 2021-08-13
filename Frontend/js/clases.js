//Lista de meses utilizados para la creacion de titulos en cada tabla
const listaMeses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

import { Calcular } from "../js/edicion.js";
//Funcion que indica el nuevo valor de un campo editable
//asignada al event listener OnChange de los campos editables
function realizarCalculos(a){
  //console.log(a.target.id+" cambio a "+a.target.value);
  Calcular(a);
}

//Funcion para revisar que el valor ingresado en un editable este entre  1 y 100
function revisarValor(a){
  if (a.target.value < 1 || a.target.value > 100 || a.target.value == null){
    alert("El valor ingresado debe estar entre 1 y 100");
    a.target.value = 1;    
  }  
  Calcular(a);
}

//Clase encargada de crear el DOM de la seccion y operaciones de la seccion Resumen Financiero
export class ResumenFinanciero{

  crearResumenFinanciero(){
    let seccion = document.getElementById('ResumenFinanciero');
    let vista = ``;
    vista += `
    <h3>Resumen Financiero</h3>
    <table class="table table-bordered table-striped table-primary text-center" style="max-width: 600px;" id="tablaResumenFinanciero">
      <thead>
      </thead>
      <tbody class="contenido-tabla">
        <tr>
          <th style="width: 10%;">Ventas</th>
          <td style="width: 20%;"></td>
        </tr>
        <tr>
          <th style="width: 10%;">Costos</th>
          <td style="width: 20%;"></td>
        </tr>
        <tr>
          <th style="width: 10%;">Margen</th>
          <td style="width: 20%;"></td>
        </tr>
        <tr>
          <th style="width: 10%;">%</th>
          <td style="width: 20%;"></td>
        </tr>
      </tbody>
    </table>  
    `;
    seccion.innerHTML = vista;
  }

  calcularValor(){
    let filasResumenF = document.getElementById("tablaResumenFinanciero").querySelectorAll('.contenido-tabla tr');
    let celdaVentas = filasResumenF[0].querySelector('td');
    let celdaCostos = filasResumenF[1].querySelector('td');
    let celdaMargen = filasResumenF[2].querySelector('td');
    let celdaPorcentaje = filasResumenF[3].querySelector('td');
    
    let filasFlujo = document.getElementById("tablaFlujoDeEfectivo").querySelectorAll('.contenido-tabla tr');
    let celdasIngresos = filasFlujo[0].querySelectorAll('td');
    let celdasEgresos = filasFlujo[1].querySelectorAll('td');
    let numCeldas = celdasIngresos.length;

    let totalIngresos = parseInt(celdasIngresos[numCeldas-1].textContent,10);
    let totalEgresos = parseInt(celdasEgresos[numCeldas-1].textContent,10);
    let resultado = totalIngresos - totalEgresos;
    let porcentaje = 0;

    if (totalIngresos != 0) {
      porcentaje = ((resultado/totalIngresos)*100).toFixed(2);
      celdaPorcentaje.textContent = porcentaje+" %";
    }else{
      porcentaje = -1;
      celdaPorcentaje.textContent = " ";
    }
     

    celdaVentas.textContent = totalIngresos;
    celdaCostos.textContent = totalEgresos;
    celdaMargen.textContent = resultado;
    

    if (resultado < 0) {
      celdaMargen.style.color="red";                  
    }else{
      celdaMargen.style.color="green";
    }

    if (porcentaje < 0) {
      celdaPorcentaje.style.color="red";                  
    }else{
      celdaPorcentaje.style.color="green";
    }
  }

}

//Clase encargada de crear el DOM de la seccion y operaciones, asi como creacion y envio 
//de los arreglos json de la seccion Flujo de efectivo
export class FlujoDeEfectivo{

   mesActual = null;

  crearFlujoDeEfectivo(){
    let seccion = document.getElementById('FlujoDeEfectivo');
    let vista = ``;
    vista += `
    <h3>Flujo de Efectivo</h3>
    <table class="table table-striped table-bordered border-white table-dark text-center" id="tablaFlujoDeEfectivo">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>        
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody class="contenido-tabla">
        <tr>
          <th style="width: 10%;">Ingresos</th>
          <td id="sumaIngresos" style="width: 20%;">[sumaIngresos]</td>        
        </tr>
        <tr>
          <th style="width: 10%;">Egresos</th>
          <td id="sumaEgresos" style="width: 20%;">[sumaEgresos]</td>
        </tr>
        <tr>
          <th style="width: 10%;">Total</th>
          <td id="sumaTotal"style="width: 20%;">[sumaTotal]</td>
        </tr>
        <tr>
          <th style="width: 10%;">Acumulado</th>
          <td style="width: 20%;">Nada</td>
        </tr>
      </tbody>
    </table>
  
    <button class="btn btn-success" type="button" role="button" style="margin-bottom: 15px;" id="botonAgregarMes">Agregar Columna</button>
    <button class="btn btn-danger" type="button" role="button" style="margin-bottom: 15px;" id="botonEliminarMes">Eliminar Columna</button>
  
  `;
  seccion.innerHTML = vista;
  }

  agregarColumnaInicial(idPresupuesto, numeroMesInicial, cantidad){
    this.mesActual = numeroMesInicial;
    let mes = listaMeses[this.mesActual];
    let mesTabla = { "idPresupuesto": idPresupuesto, "inicial": true, "nombre": mes, "cantidad": cantidad };
    let tabla = document.getElementById('tablaFlujoDeEfectivo');
    let filas = tabla.querySelectorAll('tr');
    filas.forEach((element, index) => {
      let celda = element.insertCell(element.querySelectorAll('td').length);
      celda.setAttribute('class',`${mes}`);
      if (index == 0) {
        celda.textContent = mes;
      }
      if (index == 1){
        let imp = document.createElement('input');
        imp.setAttribute('type','number');
        imp.setAttribute('id',`input${mes}${index}`);
        imp.value = cantidad;
        imp.addEventListener('change', realizarCalculos);
        celda.appendChild(imp);     
      }
      
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }    
    return mesTabla;
  }

  agregarColumna(idPresupuesto, cantidad){
    let mes = listaMeses[this.mesActual];
    let mesTabla = { "idPresupuesto": idPresupuesto, "inicial": false, "nombre": mes, "cantidad": cantidad };
    let tabla = document.getElementById('tablaFlujoDeEfectivo');
    let filas = tabla.querySelectorAll('tr');
    filas.forEach((element, index) => {
      let celda = element.insertCell(element.querySelectorAll('td').length);
      celda.setAttribute('class',`${mes}`);
      if (index == 0) {
        celda.textContent = mes;
      }
      if (index == 1){
        let imp = document.createElement('input');
        imp.setAttribute('type','number');
        imp.setAttribute('id',`input${mes}${index}`);
        imp.value = cantidad;
        imp.addEventListener('change', realizarCalculos);
        celda.appendChild(imp);     
      }
      
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }    
    return mesTabla;
  }

  eliminarColumna(){
    let tabla = document.getElementById('tablaFlujoDeEfectivo');
    let filas = tabla.querySelectorAll('tr');
    let ultima = filas[0].querySelectorAll('td').length - 1;
    if (ultima > 0) {
      filas.forEach((element, index) => {
        element.deleteCell(ultima);
      });      
    } else{
      alert("No hay mas columnas para eliminar");
    }    
    this.mesActual --;
    if (this.mesActual < 0) { this.mesActual = 11; }
  }

  calcularValor(){
    let filasFlujo = document.getElementById("tablaFlujoDeEfectivo").querySelectorAll('.contenido-tabla tr');
    let filaIngresos = filasFlujo[0];
    let filaEgresos = filasFlujo[1];
    let filaTotal = filasFlujo[2];
    let filaAcumulado = filasFlujo[3];
    
    let numCeldas = filasFlujo[0].querySelectorAll('td').length;

    //console.log("celdas:"+numCeldas);

    if (numCeldas > 1) {

      filasFlujo.forEach((element, index) => {

        if (index < 3) {
          let celdasFlujo = filasFlujo[index].querySelectorAll('td');
          let acumulador = 0;   

          celdasFlujo.forEach((elemento, indice) => {
            
            //Ingresos
            if (index == 0) {
              if (indice < (numCeldas-1)) {
                
                let ingreso = parseInt(celdasFlujo[indice].querySelector('input').value,10);                
                acumulador += ingreso; 
              }else{
                celdasFlujo[indice].textContent = acumulador;             
              }
            //Egresos
            }else if( index == 1){
              if (indice < (numCeldas-1)) {
                let filasCosto = document.getElementById("tablaCostos").querySelectorAll('.contenido-tabla tr');
                let numFilasCosto = filasCosto.length;
                let celdasCosto = filasCosto[numFilasCosto-1].querySelectorAll('td');

                let filasGasto = document.getElementById("tablaGastos").querySelectorAll('.contenido-tabla tr');
                let numFilasGasto = filasGasto.length;
                let celdasGasto = filasGasto[numFilasGasto-1].querySelectorAll('td');

                let costo = parseInt(celdasCosto[indice].textContent,10);
                let gasto = parseInt(celdasGasto[indice].textContent,10);
                let resultado = costo + gasto;

                celdasFlujo[indice].textContent = resultado;
                acumulador += resultado;    
              }else{
                celdasFlujo[indice].textContent = acumulador;
              }
            }
            //Total
            else if( index == 2){
              if (indice < (numCeldas-1)) {

                let celdasIngresos = filasFlujo[index-2].querySelectorAll('td');
                let celdasEgresos = filasFlujo[index-1].querySelectorAll('td');
                
                let ingreso = parseInt(celdasIngresos[indice].querySelector('input').value,10);
                let egreso = parseInt(celdasEgresos[indice].textContent,10);
                let resultado = ingreso - egreso;

                celdasFlujo[indice].textContent = resultado;
                if (resultado < 0) {
                  celdasFlujo[indice].style.color="red";                  
                }else{
                  celdasFlujo[indice].style.color="green";
                }
                acumulador += resultado; 
              }else{
                celdasFlujo[indice].textContent = acumulador;
              }
            }            
          });          
        } else{
          let celdasTotal = filasFlujo[index-1].querySelectorAll('td');
          let celdasFlujo = filasFlujo[index].querySelectorAll('td');

          celdasFlujo.forEach((elemento, indice) => {
            if (indice != 0) {
              if (indice == numCeldas-1) {
                celdasFlujo[indice].textContent = " ";
                
              }else{
                let anterior = parseInt(celdasFlujo[indice-1].textContent,10);              
                let resultado = anterior + parseInt(celdasTotal[indice].textContent,10);              
                celdasFlujo[indice].textContent = resultado;
                if (resultado < 0) {
                  celdasFlujo[indice].style.color="red";                  
                }else{
                  celdasFlujo[indice].style.color="green";
                } 
              }
                          
            }else{
              let resultado = parseInt(celdasTotal[indice].textContent,10);
              celdasFlujo[indice].textContent = resultado;
              if (resultado < 0) {
                celdasFlujo[indice].style.color="red";                  
              }else{
                celdasFlujo[indice].style.color="green";
              }
            }        
          });
        }        
      });      
    }
    else{
      filaIngresos.querySelector('td').textContent = 0;
      filaEgresos.querySelector('td').textContent = 0;
      filaTotal.querySelector('td').textContent = 0;
      filaAcumulado.querySelector('td').textContent = 0;

      //alert("No hay suficientes datos")
    }
  }  

  guardarValor(meses, idPresupuesto){
    
    let numMeses = meses.length;
    console.log("Meses:"+ numMeses);

    let filaF = document.getElementById("tablaFlujoDeEfectivo").querySelector('.contenido-tabla tr');
    let celdasF = filaF.querySelectorAll('td');
    let inicial = false;

    for (let indice = 0; indice < numMeses; indice++) {
      if (indice == 0) {
        inicial = true;        
      }else{
        inicial = false;
      }

      let nombre = celdasF[indice].className;
      let cantidad = parseInt(celdasF[indice].querySelector('input').value,10);

      console.log("Celda:"+indice);
      console.log("Inicial: "+inicial+" Nombre: "+nombre+" cantidad:"+cantidad);

      meses[indice].idPresupuesto = idPresupuesto;
      meses[indice].inicial = inicial;
      meses[indice].nombre = nombre;
      meses[indice].cantidad = cantidad;
    }            
    
  }

}

//Clase encargada de crear el DOM de la seccion y operaciones de la seccion Estado de Resultados
export class EstadoDeResultados{
  mesActual = null;

  crearEstadoDeResultados(){
    let seccion = document.getElementById('EstadoDeResultados');
    let vista = ``;
    vista += `
    <h3>Estado de Resultados</h3>
    <table class="table table-striped table-bordered border-primary table-success text-center" id="tablaEstadoDeResultados">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</th>    
        </tr>
      </thead>
      <tbody class="contenido-tabla">
        <tr>
          <th style="width: 10%;">Ventas</th>
          <td id="sumaVentas" style="width: 20%;">[sumaVentas]</td>
        </tr>
        <tr>
          <th style="width: 10%;">Costos</th>
          <td id="sumaCostos" style="width: 20%;">[sumaCostos]</td>
        </tr>
        <tr>
          <th style="width: 10%;">Margen</th>
          <td id="sumaMargen" style="width: 20%;">[sumaMargen]</td>
        </tr>
        <tr>
          <th style="width: 10%;">Saldo Final</th>
          <td style="width: 20%;">NADA</td>
        </tr>
      </tbody>
    </table>
    `;
    seccion.innerHTML = vista;  
  }

  agregarColumnaInicial(numeroMesInicial){
    this.mesActual = numeroMesInicial;
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaEstadoDeResultados');
    let filas = tabla.querySelectorAll('tr');
    filas.forEach((element, index) => {
      let celda = element.insertCell(element.querySelectorAll('td').length);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }
      if (index == 1){
        
      }      
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }  
  }

  agregarColumna(){ 
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaEstadoDeResultados');
    let filas = tabla.querySelectorAll('tr');
    filas.forEach((element, index) => {
      let celda = element.insertCell(element.querySelectorAll('td').length);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }
      if (index == 1){
        
      }      
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }  
  }

  eliminarColumna(){
    let tabla = document.getElementById('tablaEstadoDeResultados');
    let filas = tabla.querySelectorAll('tr');
    let ultima = filas[0].querySelectorAll('td').length - 1;
    if (ultima > 0) {
      filas.forEach((element, index) => {
        element.deleteCell(ultima);
      });      
    }
    this.mesActual --;
    if (this.mesActual < 0) { this.mesActual = 11; }
  }

  calcularValor(){
    let filasResultado = document.getElementById("tablaEstadoDeResultados").querySelectorAll('.contenido-tabla tr');
    let filaVentasR = filasResultado[0];
    let filaCostosR = filasResultado[1];
    let filaMargenR = filasResultado[2];
    let filaSaldoFinal = filasResultado[3];
    
    let numCeldas = filasResultado[0].querySelectorAll('td').length;
    let filaFinal = [];

    for (let index = 0; index < numCeldas-1; index++) {
      filaFinal[index] = 0; 
    }    
    //console.log(filaFinal);
    //console.log("filas"+numFilas);
    //console.log("celdas:"+numCeldas);

    if (numCeldas > 1) {

      filasResultado.forEach((element, index) => {

        if (index < 3) {
          let celdasResultado = filasResultado[index].querySelectorAll('td');
          let acumulador = 0;          

          celdasResultado.forEach((elemento, indice) => {
            
            //Ventas
            if (index == 0) {
              if (indice < (numCeldas-1)) {
                let filasIngreso = document.getElementById("tablaIngresos").querySelectorAll('.contenido-tabla tr');
                let numFilasIngreso = filasIngreso.length;
                let celdasIngreso = filasIngreso[numFilasIngreso-1].querySelectorAll('td');

                let venta = parseInt(celdasIngreso[indice].textContent,10);
                celdasResultado[indice].textContent = venta;
                acumulador += venta; 
              }else{
                celdasResultado[indice].textContent = acumulador;                
              }
            }else if( index == 1){
              if (indice < (numCeldas-1)) {
                let filasCosto = document.getElementById("tablaCostos").querySelectorAll('.contenido-tabla tr');
                let numFilasCosto = filasCosto.length;
                let celdasCosto = filasCosto[numFilasCosto-1].querySelectorAll('td');

                let filasGasto = document.getElementById("tablaGastos").querySelectorAll('.contenido-tabla tr');
                let numFilasGasto = filasGasto.length;
                let celdasGasto = filasGasto[numFilasGasto-1].querySelectorAll('td');

                let costo = parseInt(celdasCosto[indice].textContent,10);
                let gasto = parseInt(celdasGasto[indice].textContent,10);
                let resultado = costo + gasto;

                celdasResultado[indice].textContent = resultado;
                acumulador += resultado;    
              }else{
                celdasResultado[indice].textContent = acumulador;
              }
              
            }else if( index == 2){
              if (indice < (numCeldas-1)) {

                let celdasVentas = filasResultado[index-2].querySelectorAll('td');
                let celdasCostos = filasResultado[index-1].querySelectorAll('td');
                
                let venta = parseInt(celdasVentas[indice].textContent,10);
                let costo = parseInt(celdasCostos[indice].textContent,10);
                let resultado = venta - costo;

                celdasResultado[indice].textContent = resultado;
                if (resultado < 0) {
                  celdasResultado[indice].style.color="red";                  
                }else{
                  celdasResultado[indice].style.color="green";
                }

                acumulador += resultado;   
              }else{
                celdasResultado[indice].textContent = acumulador;
              }
            }            
          });          
        } else{
          let celdasMargen = filasResultado[index-1].querySelectorAll('td');
          let celdasResultado = filasResultado[index].querySelectorAll('td');

          celdasResultado.forEach((elemento, indice) => {
            if (indice != 0) {
              if (indice == numCeldas-1) {
                celdasResultado[indice].textContent = " ";
                
              }else{
                let anterior = parseInt(celdasResultado[indice-1].textContent,10);              
                let resultado = anterior + parseInt(celdasMargen[indice].textContent,10);              
                celdasResultado[indice].textContent = resultado;
                if (resultado < 0) {
                  celdasResultado[indice].style.color="red";                  
                }else{
                  celdasResultado[indice].style.color="green";
                } 
              }
                          
            }else{
              let resultado = parseInt(celdasMargen[indice].textContent,10);
              celdasResultado[indice].textContent = resultado;
              if (resultado < 0) {
                celdasResultado[indice].style.color="red";                  
              }else{
                celdasResultado[indice].style.color="green";
              }
            }

            
                   
          });
        }        
      });      
    }
    else{
      filaVentasR.querySelector('td').textContent = 0;
      filaCostosR.querySelector('td').textContent = 0;
      filaMargenR.querySelector('td').textContent = 0;
      filaSaldoFinal.querySelector('td').textContent = 0;

      //alert("No hay suficientes datos")
    }

  }

}

//Clase encargada de crear el DOM de la seccion, operaciones, asi como creacion y envio 
//de los arreglos json de la seccion Ingresos
export class Ingresos{
  mesActual = null;
  focusActual = null;

  crearIngresos(){
    let seccion = document.getElementById('Ingresos');
    let vista = ``;
    vista += `
    <h3>Ingresos</h3>
    <table class="table table-striped table-bordered border-success table-dark text-center" id="tablaIngresos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody class="contenido-tabla">
        <tr>
          <th style="width: 10%;">Total</th>
          <td id="sumaTotal" style="width: 20%;">[sumaTotal]</td>
        </tr>
      </tbody>
    </table>
    
    <button class="btn btn-success" type="button" role="button" id="botonAgregarIngreso" style="margin-bottom: 15px;">Agregar Fila</button>
    <button class="btn btn-danger" type="button" role="button"  id="botonEliminarIngreso" style="margin-bottom: 15px;">Eliminar Fila</button>    
    `;
    seccion.innerHTML = vista;
  }

  agregarColumnaInicial(numeroMesInicial){
    this.mesActual = numeroMesInicial;
    let ingresosColumna = [];
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaIngresos');
    let filas = tabla.querySelectorAll('tr');    
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length;
    
    filas.forEach((element, index) => {  
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){
        let concepto = element.querySelector('th').className;
        let ingreso = { "idMes": celdas, "concepto": concepto, "cantidad": 0 };
        ingresosColumna.push(ingreso);
        let imp = document.createElement('input');
        imp.setAttribute('type','number');
        imp.setAttribute('id',`input${concepto}${celdas}`);
        imp.value = 0;
        imp.addEventListener('change', realizarCalculos);
        celda.appendChild(imp);        
      }else{
        celda.textContent = `[total${mes}]`;
      }
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; } 
    return ingresosColumna;
  }

  agregarColumna(){
    let mes = listaMeses[this.mesActual];
    let ingresosColumna = [];
    let tabla = document.getElementById('tablaIngresos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length

    filas.forEach((element, index) => {
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){  
        let concepto = element.querySelector('th').className;
        let ingreso = { "idMes": celdas, "concepto": concepto, "cantidad": 0 };
        ingresosColumna.push(ingreso);
        let imp = document.createElement('input');
        imp.setAttribute('type','number');
        imp.setAttribute('id',`input${concepto}${celdas}`);
        imp.value = 0;
        imp.addEventListener('change', realizarCalculos);
        celda.appendChild(imp);        
      }else{
        celda.textContent = `[total${mes}]`;
      }
         
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }
    return ingresosColumna; 
  }

  eliminarColumna(){
    let tabla = document.getElementById('Ingresos');
    let filas = tabla.querySelectorAll('tr');
    let ultima = filas[0].querySelectorAll('td').length - 1;
    if (ultima > 0) {
      filas.forEach((element, index) => {
        element.deleteCell(ultima);
      });      
    }
    this.mesActual --;
    if (this.mesActual < 0) { this.mesActual = 11; }
  }

  agregarFila(concepto, cantidad){
    let ingresosFila = [];
    let tabla = document.getElementById('tablaIngresos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let nuevaFila = tabla.insertRow(numFilas-1);    
    nuevaFila.setAttribute('class',`${concepto}`);
    let columnas = filas[0].querySelectorAll('td').length
    for (let index = 0; index <= columnas; index++) {      
      if (index == 0) {
        let celda = document.createElement('th');
        celda.setAttribute('class',`${concepto}`);
        let vista = '';
        vista += `          
          <input type="radio" class="btn-check" name="conceptos" id="${concepto}" autocomplete="off">
          <label class="btn btn-outline-primary" for="${concepto}">${concepto}</label>    
        `;        
        celda.innerHTML = vista; 
        nuevaFila.appendChild(celda);
        let boton = document.getElementById(concepto);
        boton.addEventListener('change', () =>{
          this.focusActual = concepto;
        });
      }
      else if(index != columnas){
        let ingreso = { "idMes": index, "concepto": concepto, "cantidad": cantidad };
        ingresosFila.push(ingreso);
        let celda = nuevaFila.insertCell(index);
        let imp = document.createElement('input');
        imp.setAttribute('type','number');
        imp.setAttribute('id',`input${concepto}${index}`);
        imp.value = cantidad;
        imp.addEventListener('change', realizarCalculos);
        celda.appendChild(imp);
      }else{
        let celda = nuevaFila.insertCell(index);
        celda.textContent = `[suma${concepto}]`
      }            
    }
    return ingresosFila;
  }

  eliminarFila(concepto){
    let tabla = document.getElementById("tablaIngresos");
    let fila = document.querySelector(`.concepto_${concepto}`);
    //console.log("indice: "+fila.rowIndex);
    tabla.deleteRow(fila.rowIndex);
    this.focusActual = null;
  }

  calcularValor(){
    let filasIngreso = document.getElementById("tablaIngresos").querySelectorAll('.contenido-tabla tr');
    let numFilas = filasIngreso.length;
    let numCeldas = filasIngreso[0].querySelectorAll('td').length;
    let filaFinal = [];

    for (let index = 0; index < numCeldas; index++) {
      filaFinal[index] = 0; 
    }    
    //console.log(filaFinal);
    //console.log("filas"+numFilas);
    //console.log("celdas:"+numCeldas);

    if (numFilas > 1) {
      filasIngreso.forEach((element, index) => {

        if (index < (numFilas-1)) {  
          let celdasIngreso = filasIngreso[index].querySelectorAll('td');
          let acumulador = 0;          

          celdasIngreso.forEach((elemento, indice) => {

            if (indice < (numCeldas-1)) {
              let ingreso = parseInt(celdasIngreso[indice].querySelector('input').value);
              acumulador += ingreso;
              //console.log("Acumu: "+acumulador);
              filaFinal[indice] += ingreso;
            }else{
              celdasIngreso[indice].textContent = acumulador;
              filaFinal[indice] += acumulador;
            }
                     
          });          
        } else{
          let celdasIngreso = filasIngreso[index].querySelectorAll('td');

          celdasIngreso.forEach((elemento, indice) => {
            celdasIngreso[indice].textContent = filaFinal[indice];            
          });
        }        
      });      
    }
    else{
      let celdasIngreso = filasIngreso[0].querySelectorAll('td');
      celdasIngreso.forEach((elemento, indice) => {
        celdasIngreso[indice].textContent = 0;
      });
      //alert("No hay suficientes datos")
    }
    
  }

  guardarValor(ingresos){
    
    let numColumnasA = ingresos.length;    
    let numFilasA = ingresos[0].length;

    //console.log("tabla Ingresos tamaño:");
    //console.log("filas: " + numFilasA + " Columnas: " + numColumnasA);    

    let filasI = document.getElementById("tablaIngresos").querySelectorAll('.contenido-tabla tr');

    for (let index = 0; index < numFilasA; index++) {

      let celdasI = filasI[index].querySelectorAll('td');
      let conceptoI = filasI[index].className; 

      for (let indice = 0; indice < numColumnasA; indice++) {          
        let cantidad = parseInt(celdasI[indice].querySelector('input').value,10);   

        //console.log("Fila:"+index+" columna:"+indice);
        //console.log("Concepto: "+conceptoI+" Cantidad: "+cantidad);

        ingresos[indice][index].concepto = conceptoI;
        ingresos[indice][index].cantidad = cantidad;
      }            
    }
  }
  
}

//Clase encargada de crear el DOM de la seccion, operaciones, asi como creacion y envio 
//de los arreglos json de la seccion Costos Directos
export class CostosDirectos{

  mesActual = null;
  focusActual = null;
  opcionActual = null;

  crearCostosDirectos(){
    let seccion = document.getElementById('Costos');
    let vista = ``;
    
    vista += `
    <h3>Costos Directos</h3>
    <table class="table table-striped table-bordered border-danger table-dark text-center" id="tablaCostos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody class="contenido-tabla">        
        <tr>
          <th style="width: 10%;">Total</th>
          <td id="sumaTotal" style="width: 20%;">[sumaTotal]</td>
        </tr>
      </tbody>
    </table>

    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="margin-bottom: 15px;">
      <input type="radio" class="btn-check" name="btnradio" id="botonCostosOpcion1" autocomplete="off">
      <label class="btn btn-outline-success" for="botonCostosOpcion1">Opcion 1</label>
    
      <input type="radio" class="btn-check" name="btnradio" id="botonCostosOpcion2" autocomplete="off">
      <label class="btn btn-outline-success" for="botonCostosOpcion2">Opcion 2</label>
    
      <input type="radio" class="btn-check" name="btnradio" id="botonCostosOpcion3" autocomplete="off">
      <label class="btn btn-outline-success" for="botonCostosOpcion3">Opcion 3</label>
    </div>

    <button class="btn btn-success" type="button" role="button" id="botonAgregarCosto" style="margin-bottom: 15px;">Agregar Fila</button>
    <button class="btn btn-danger" type="button" role="button"  id="botonEliminarCosto" style="margin-bottom: 15px;">Eliminar Fila</button>
    `;
    seccion.innerHTML = vista;
    document.getElementById('botonCostosOpcion1').addEventListener('change', () =>{
      this.opcionActual = 1;
    });
    document.getElementById('botonCostosOpcion2').addEventListener('change', () =>{
      this.opcionActual = 2;
    });
    document.getElementById('botonCostosOpcion3').addEventListener('change', () =>{
      this.opcionActual = 3;
    });
  }

  agregarColumnaInicial(numeroMesInicial, opcion){
    this.mesActual = numeroMesInicial;
    let costosColumna = [];
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaCostos');
    let filas = tabla.querySelectorAll('tr');    
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length;
    let porcentaje = "";

    filas.forEach((element, index) => {
      let concepto = element.className;
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){        
        if (element.querySelector('th').className == `op1`) {
          opcion = 1;       
        }else if (element.querySelector('th').className == `op2`){
          opcion = 2;
        }else{
          opcion = 3;
          porcentaje = element.querySelector('th').className;
        }        
        let costo = { "idMes": celdas, "concepto": concepto, "opcion": opcion, "cantidad": 0, "opcionDos": null, "opcionTres": null };
        if (opcion == 1) {
          let imp = document.createElement('input');
          imp.setAttribute('type','number');
          imp.setAttribute('id',`input${concepto}${celdas}`);
          imp.value = 0;
          imp.addEventListener('change', realizarCalculos);
          celda.appendChild(imp);
        } else if (opcion == 2) {
          costo.opcion = 2;
          costo.cantidad = null;
          costo.opcionDos = "tablaRecursos";          
          costo.opcionTres = null;
          celda.textContent = "opcion tipo 2";          
        } else{
          costo.opcion = 3;
          costo.cantidad = null;
          costo.opcionDos = null;
          costo.opcionTres = "tablaRecursos_"+porcentaje;
          celda.textContent = "opcion tipo 3";
        } 
        costosColumna.push(costo);
      }else{
        celda.textContent = `[total${mes}]`;
      }
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; } 
    return costosColumna;

  }

  agregarColumna(opcion){
    let mes = listaMeses[this.mesActual];
    let costosColumna = [];
    let tabla = document.getElementById('tablaCostos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length;
    let porcentaje = "";

    filas.forEach((element, index) => {
      let concepto = element.className;
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){  
        if (element.querySelector('th').className == `op1`) {
          opcion = 1;       
        }else if (element.querySelector('th').className == `op2`){
          opcion = 2;
        }else{
          opcion = 3;
          porcentaje = element.querySelector('th').className;
        }
        let costo = { "idMes": celdas, "concepto": concepto, "opcion": opcion, "cantidad": 0, "opcionDos": null, "opcionTres": null };
        if (opcion == 1) {
          let imp = document.createElement('input');
          imp.setAttribute('type','number');
          imp.setAttribute('id',`input${concepto}${celdas}`);
          imp.value = 0;
          imp.addEventListener('change', realizarCalculos);
          celda.appendChild(imp);
        } else if (opcion == 2) {
          costo.opcion = 2;
          costo.cantidad = null;
          costo.opcionDos = "tablaRecursos";          
          costo.opcionTres = null;
          celda.textContent = "opcion tipo 2"
          
        } else {
          costo.opcion = 3;
          costo.cantidad = null;
          costo.opcionDos = null;
          costo.opcionTres = "tablaRecursos_"+porcentaje;
          celda.textContent = "opcion tipo 3"
        }
        costosColumna.push(costo);
      }else{
        celda.textContent = `[total${mes}]`;
      }
         
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }
    return costosColumna; 
  }

  eliminarColumna(){
    let tabla = document.getElementById('tablaCostos');
    let filas = tabla.querySelectorAll('tr');
    let ultima = filas[0].querySelectorAll('td').length - 1;
    if (ultima > 0) {
      filas.forEach((element, index) => {
        element.deleteCell(ultima);
      });      
    }
    this.mesActual --;
    if (this.mesActual < 0) { this.mesActual = 11; }
  }

  agregarFila(concepto, opcion, cantidad, porcentaje){
    let costosFila = [];
    let tabla = document.getElementById('tablaCostos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let nuevaFila = tabla.insertRow(numFilas-1);    
    nuevaFila.setAttribute('class',`${concepto}`);
    let columnas = filas[0].querySelectorAll('td').length
    for (let index = 0; index <= columnas; index++) {      
      if (index == 0) {
        let celda = document.createElement('th');
        if (opcion == 3) {
          celda.setAttribute('class',`${porcentaje}`);          
        }else{
          celda.setAttribute('class',`op${opcion}`);
        }        
        let vista = '';
        vista += `          
          <input type="radio" class="btn-check" name="costos" id="${concepto}" autocomplete="off">
          <label class="btn btn-outline-primary" for="${concepto}">${concepto}</label>    
        `;        
        celda.innerHTML = vista; 
        nuevaFila.appendChild(celda);
        let boton = document.getElementById(concepto);
        boton.addEventListener('change', () =>{
          this.focusActual = concepto;
        });
      }
      else if(index != columnas){ 
        let celda = nuevaFila.insertCell(index);
        let costo = { "idMes": index, "concepto": concepto, "opcion": opcion, "cantidad": cantidad, "opcionDos": null, "opcionTres": null };  
        if (opcion == 1) {         
          let imp = document.createElement('input');
          imp.setAttribute('type','number');
          imp.setAttribute('id',`input${concepto}${index}`);
          imp.value = cantidad;
          imp.addEventListener('change', realizarCalculos);
          celda.appendChild(imp);
        } else if (opcion == 2) {
          costo.opcion = 2;
          costo.cantidad = null;
          costo.opcionDos = "tablaRecursos";          
          costo.opcionTres = null;
          celda.textContent = "opcion tipo 2"; 
        } else {
          costo.opcion = 3;
          costo.cantidad = null;
          costo.opcionDos = null;
          costo.opcionTres = "tablaRecursos_"+opcion;
          celda.textContent = "opcion tipo 3";
        }
        costosFila.push(costo);
      }else{
        let celda = nuevaFila.insertCell(index);
        celda.textContent = `[suma${concepto}]`
      }            
    }
    return costosFila;
  }

  eliminarFila(concepto){
    let tabla = document.getElementById("tablaCostos");
    let fila = document.querySelector(`tr.${concepto}`);
    //console.log("indice: "+fila.rowIndex);
    tabla.deleteRow(fila.rowIndex);
    this.focusActual = null;
  }

  calcularValor(){
    let filasCosto = document.getElementById("tablaCostos").querySelectorAll('.contenido-tabla tr');
    let numFilas = filasCosto.length;
    let numCeldas = filasCosto[0].querySelectorAll('td').length;
    let filaFinal = [];

    for (let index = 0; index < numCeldas; index++) {
      filaFinal[index] = 0; 
    }     

    if (numFilas > 1) {
      filasCosto.forEach((element, index) => {

        if (index < (numFilas-1)) {  
          let celdasCosto = filasCosto[index].querySelectorAll('td');
          let opcion = filasCosto[index].querySelector('th').className;
          let acumulador = 0;          

          celdasCosto.forEach((elemento, indice) => {

            if (opcion == 'op1') {
              if (indice < (numCeldas-1)) {
                let costo = parseInt(celdasCosto[indice].querySelector('input').value);
                acumulador += costo;
                filaFinal[indice] += costo;
              }else{
                celdasCosto[indice].textContent = acumulador;
                filaFinal[indice] += acumulador;
              }              
            }else{
              if (indice < (numCeldas-1)) {
                let filasCostoR = document.getElementById("tablaRecursosCostos").querySelectorAll('.contenido-tabla tr');
                let numFilasCostoR = filasCostoR.length;
                let celdasCostoR = filasCostoR[numFilasCostoR-1].querySelectorAll('td');

                let costo = parseInt(celdasCostoR[indice].textContent,10);
                if (opcion != 'op2') {
                  let porcentaje = parseInt(opcion, 10);
                  costo = costo*(porcentaje/100);
                  
                }              
                
                celdasCosto[indice].textContent = costo;
                acumulador += costo;
                filaFinal[indice] += costo;
              }else{
                celdasCosto[indice].textContent = acumulador;
                filaFinal[indice] += acumulador;
              }
            }            
          });          
        } else{
          let celdasCosto = filasCosto[index].querySelectorAll('td');

          celdasCosto.forEach((elemento, indice) => {
            celdasCosto[indice].textContent = filaFinal[indice];            
          });
        }        
      });      
    }
    else{
      let celdasCosto = filasCosto[0].querySelectorAll('td');
      celdasCosto.forEach((elemento, indice) => {
        celdasCosto[indice].textContent = 0;        
      });
      //alert("No hay suficientes datos")
    }
    
  }

  guardarValor(costos){
    
    let numColumnasA = costos.length;    
    let numFilasA = costos[0].length;

    console.log("tabla Costos tamaño:");
    console.log("filas: " + numFilasA + " Columnas: " + numColumnasA);
    

    let filasC = document.getElementById("tablaCostos").querySelectorAll('.contenido-tabla tr');

    for (let index = 0; index < numFilasA; index++) {

      let celdasC = filasC[index].querySelectorAll('td');
      let conceptoC = filasC[index].className;
      let opcion = 0;
      let cantidad = null;
      let opcionDos = null;
      let opcionTres = null;
      let porcentaje = null;

      if (filasC[index].querySelector('th').className == "op1") {
        opcion = 1;
      }else if(filasC[index].querySelector('th').className == "op2"){
        opcion = 2;
        opcionDos = "tablaRecursosCostos";
      }else{
        opcion = 3;
        porcentaje = filasC[index].querySelector('th').className;
        opcionTres = "tablaRecursosCostos_"+porcentaje;
      }

      for (let indice = 0; indice < numColumnasA; indice++) {  
        if (opcion == 1) {
          cantidad = parseInt(celdasC[indice].querySelector('input').value,10);           
        }      

        console.log("Fila:"+index+" columna:"+indice);
        console.log("Concepto: "+conceptoC+" Opcion:"+opcion+" Cantidad: "+cantidad+" op2: " +opcionDos+" op3"+opcionTres);

        costos[indice][index].concepto = conceptoC;
        costos[indice][index].opcion = opcion;
        costos[indice][index].cantidad = cantidad
        costos[indice][index].opcionDos = opcionDos;
        costos[indice][index].opcionTres = opcionTres;
      }            
    }
  }

}

//Clase encargada de crear el DOM de la seccion, operaciones, asi como creacion y envio 
//de los arreglos json de la seccion Gastos Administrativos
export class GastosAdministrativos{

  mesActual = null;
  focusActual = null;
  opcionActual = null;  

  crearGastosAdministrativos(){
    let seccion = document.getElementById('Gastos');
    let vista = ``;
    
    vista += `
    <h3>Gastos Administrativos</h3>
    <table class="table table-striped table-bordered border-warning table-dark text-center" id="tablaGastos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody class="contenido-tabla">        
        <tr>
          <th style="width: 10%;">Total</th>
          <td id="sumaTotal" style="width: 20%;">[sumaTotal]</td>
        </tr>
      </tbody>
    </table>

    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="margin-bottom: 15px;">
      <input type="radio" class="btn-check" name="btnradio1" id="botonGastosOpcion1" autocomplete="off">
      <label class="btn btn-outline-success" for="botonGastosOpcion1">Opcion 1</label>
    
      <input type="radio" class="btn-check" name="btnradio1" id="botonGastosOpcion2" autocomplete="off">
      <label class="btn btn-outline-success" for="botonGastosOpcion2">Opcion 2</label>
    
      <input type="radio" class="btn-check" name="btnradio1" id="botonGastosOpcion3" autocomplete="off">
      <label class="btn btn-outline-success" for="botonGastosOpcion3">Opcion 3</label>
    </div>

    <button class="btn btn-success" type="button" role="button" id="botonAgregarGasto" style="margin-bottom: 15px;">Agregar Fila</button>
    <button class="btn btn-danger" type="button" role="button"  id="botonEliminarGasto" style="margin-bottom: 15px;">Eliminar Fila</button> 
    `;
    seccion.innerHTML = vista;
    document.getElementById('botonGastosOpcion1').addEventListener('change', () =>{
      this.opcionActual = 1;
    });
    document.getElementById('botonGastosOpcion2').addEventListener('change', () =>{
      this.opcionActual = 2;
    });
    document.getElementById('botonGastosOpcion3').addEventListener('change', () =>{
      this.opcionActual = 3;
    });
  }

  agregarColumnaInicial(numeroMesInicial, opcion){
    this.mesActual = numeroMesInicial;
    let gastosColumna = [];
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaGastos');
    let filas = tabla.querySelectorAll('tr');    
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length;
    let porcentaje = "";

    filas.forEach((element, index) => {
      let concepto = element.className;
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){
        if (element.querySelector('th').className == `op1`) {
          opcion = 1;       
        }else if (element.querySelector('th').className == `op2`){
          opcion = 2;
        }else{          
          opcion = 3;
          porcentaje = element.querySelector('th').className;
        }        
        let gasto = { "idMes": celdas, "concepto": concepto, "opcion": opcion, "cantidad": 0, "opcionDos": null, "opcionTres": null };
        if (opcion == 1) {
          let imp = document.createElement('input');
          imp.setAttribute('type','number');
          imp.setAttribute('id',`input${concepto}${celdas}`);
          imp.value = 0;
          imp.addEventListener('change', realizarCalculos);
          celda.appendChild(imp);
        } else if (opcion == 2) {
          gasto.opcion = 2;
          gasto.cantidad = null;
          gasto.opcionDos = "tablaRecursos";          
          gasto.opcionTres = null;
          celda.textContent = "opcion tipo 2";          
        } else{
          gasto.opcion = 3;
          gasto.cantidad = null;
          gasto.opcionDos = null;
          gasto.opcionTres = "tablaRecursos_"+porcentaje;
          celda.textContent = "opcion tipo 3";
        }

        gastosColumna.push(gasto);
      }else{
        celda.textContent = `[total${mes}]`;
      }
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; } 
    return gastosColumna;

  }

  agregarColumna(opcion){
    let mes = listaMeses[this.mesActual];
    let gastosColumna = [];
    let tabla = document.getElementById('tablaGastos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length;
    let porcentaje = "";

    filas.forEach((element, index) => {
      let concepto = element.className;
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){  
        if (element.querySelector('th').className == `op1`) {
          opcion = 1;       
        }else if (element.querySelector('th').className == `op2`){
          opcion = 2;
        }else{
          porcentaje = element.querySelector('th').className;
          opcion = 3;
        }
        let gasto = { "idMes": celdas, "concepto": concepto, "opcion": opcion, "cantidad": 0, "opcionDos": null, "opcionTres": null };
        if (opcion == 1) {
          let imp = document.createElement('input');
          imp.setAttribute('type','number');
          imp.setAttribute('id',`input${concepto}${celdas}`);
          imp.value = 0;
          imp.addEventListener('change', realizarCalculos);
          celda.appendChild(imp);
        } else if (opcion == 2) {
          gasto.opcion = 2;
          gasto.cantidad = null;
          gasto.opcionDos = "tablaRecursos";          
          gasto.opcionTres = null;
          celda.textContent = "opcion tipo 2"
          
        } else{
          gasto.opcion = 3;
          gasto.cantidad = null;
          gasto.opcionDos = null;
          gasto.opcionTres = "tablaRecursos_"+porcentaje;
          celda.textContent = "opcion tipo 3"
        }
        gastosColumna.push(gasto);
      }else{
        celda.textContent = `[total${mes}]`;
      }
         
    });
    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }
    return gastosColumna; 
  }

  eliminarColumna(){
    let tabla = document.getElementById('tablaGastos');
    let filas = tabla.querySelectorAll('tr');
    let ultima = filas[0].querySelectorAll('td').length - 1;
    if (ultima > 0) {
      filas.forEach((element, index) => {
        element.deleteCell(ultima);
      });      
    }
    this.mesActual --;
    if (this.mesActual < 0) { this.mesActual = 11; }
  }

  agregarFila(concepto, opcion, cantidad, porcentaje){
    let gastosFila = [];
    let tabla = document.getElementById('tablaGastos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let nuevaFila = tabla.insertRow(numFilas-1);    
    nuevaFila.setAttribute('class',`${concepto}`);
    let columnas = filas[0].querySelectorAll('td').length
    for (let index = 0; index <= columnas; index++) {      
      if (index == 0) {
        let celda = document.createElement('th');
        if (opcion == 3) {
          celda.setAttribute('class',`${porcentaje}`);          
        }else{
          celda.setAttribute('class',`op${opcion}`);
        }
        
        let vista = '';
        vista += `          
          <input type="radio" class="btn-check" name="gastos" id="${concepto}" autocomplete="off">
          <label class="btn btn-outline-primary" for="${concepto}">${concepto}</label>    
        `;        
        celda.innerHTML = vista; 
        nuevaFila.appendChild(celda);
        let boton = document.getElementById(concepto);
        boton.addEventListener('change', () =>{
          this.focusActual = concepto;
        });
      }
      else if(index != columnas){ 
        let celda = nuevaFila.insertCell(index);
        let gasto = { "idMes": index, "concepto": concepto, "opcion": opcion, "cantidad": cantidad, "opcionDos": null, "opcionTres": null };  
        if (opcion == 1) {         
          let imp = document.createElement('input');
          imp.setAttribute('type','number');
          imp.setAttribute('id',`input${concepto}${index}`);
          imp.value = cantidad;
          imp.addEventListener('change', realizarCalculos);
          celda.appendChild(imp);
        } else if (opcion == 2) {
          gasto.opcion = 2;
          gasto.cantidad = null;
          gasto.opcionDos = "tablaRecursosCostos";          
          gasto.opcionTres = null;
          celda.textContent = "opcion tipo 2"; 
        } else {
          gasto.opcion = 3;
          gasto.cantidad = null;
          gasto.opcionDos = null;
          gasto.opcionTres = "tablaRecursosCostos_"+porcentaje;
          celda.textContent = porcentaje+"%";
        } 
        gastosFila.push(gasto);
      }else{
        let celda = nuevaFila.insertCell(index);
        celda.textContent = `[suma${concepto}]`
      }            
    }
    return gastosFila;
  }

  eliminarFila(concepto){
    let tabla = document.getElementById("tablaGastos");
    let fila = document.querySelector(`tr.${concepto}`);
    tabla.deleteRow(fila.rowIndex);
    this.focusActual = null;
  }

  calcularValor(){
    let filasGasto = document.getElementById("tablaGastos").querySelectorAll('.contenido-tabla tr');
    let numFilas = filasGasto.length;
    let numCeldas = filasGasto[0].querySelectorAll('td').length;
    let filaFinal = [];

    for (let index = 0; index < numCeldas; index++) {
      filaFinal[index] = 0; 
    }    

    if (numFilas > 1) {
      filasGasto.forEach((element, index) => {

        if (index < (numFilas-1)) {  
          let celdasGasto = filasGasto[index].querySelectorAll('td');
          let opcion = filasGasto[index].querySelector('th').className;          
          let acumulador = 0;          

          celdasGasto.forEach((elemento, indice) => {

            if (opcion == 'op1') {
              if (indice < (numCeldas-1)) {
                let gasto = parseInt(celdasGasto[indice].querySelector('input').value);
                acumulador += gasto;
                //console.log("Acumu: "+acumulador);
                filaFinal[indice] += gasto;
              }else{
                celdasGasto[indice].textContent = acumulador;
                filaFinal[indice] += acumulador;
              }              
            }else{
              if (indice < (numCeldas-1)) {
                let filasCosto = document.getElementById("tablaRecursosCostos").querySelectorAll('.contenido-tabla tr');
                let numFilasCosto = filasCosto.length;
                let celdasCosto = filasCosto[numFilasCosto-1].querySelectorAll('td');

                let gasto = parseInt(celdasCosto[indice].textContent,10);
                if (opcion != 'op2') {
                  let porcentaje = parseInt(opcion,10);
                  gasto = gasto*(porcentaje/100);
                  
                }
                
                celdasGasto[indice].textContent = gasto;
                acumulador += gasto;
                filaFinal[indice] += gasto;
              }else{
                celdasGasto[indice].textContent = acumulador;
                filaFinal[indice] += acumulador;
              }
            }            
          });          
        } else{
          let celdasGasto = filasGasto[index].querySelectorAll('td');

          celdasGasto.forEach((elemento, indice) => {
            celdasGasto[indice].textContent = filaFinal[indice];            
          });
        }        
      });      
    }
    else{
      let celdasGasto = filasGasto[0].querySelectorAll('td');
      celdasGasto.forEach((elemento, indice) => {
        celdasGasto[indice].textContent = 0;        
      });
      //alert("No hay suficientes datos")
    }
    
  }

  guardarValor(gastos){
    
    let numColumnasA = gastos.length;    
    let numFilasA = gastos[0].length;

    //console.log("tabla Gastos tamaño:");
    //console.log("filas: " + numFilasA + " Columnas: " + numColumnasA);
    

    let filasG = document.getElementById("tablaGastos").querySelectorAll('.contenido-tabla tr');

    for (let index = 0; index < numFilasA; index++) {

      let celdasG = filasG[index].querySelectorAll('td');
      let conceptoG = filasG[index].className;
      let opcion = 0;
      let cantidad = null;
      let opcionDos = null;
      let opcionTres = null;
      let porcentaje = null;

      if (filasG[index].querySelector('th').className == "op1") {
        opcion = 1;
      }else if(filasG[index].querySelector('th').className == "op2"){
        opcion = 2;
        opcionDos = "tablaRecursosCostos";
      }else{
        opcion = 3;
        porcentaje = filasG[index].querySelector('th').className;
        opcionTres = "tablaRecursosCostos_"+porcentaje;
      }

      for (let indice = 0; indice < numColumnasA; indice++) {  
        if (opcion == 1) {
          cantidad = parseInt(celdasG[indice].querySelector('input').value,10);           
        }      

        //console.log("Fila:"+index+" columna:"+indice);
        //console.log("Concepto: "+conceptoG+" Opcion:"+opcion+" Cantidad: "+cantidad+" op2: " +opcionDos+" op3"+opcionTres );

        gastos[indice][index].concepto = conceptoG;
        gastos[indice][index].opcion = opcion;
        gastos[indice][index].cantidad = cantidad
        gastos[indice][index].opcionDos = opcionDos;
        gastos[indice][index].opcionTres = opcionTres;
      }            
    }
  }

}

//Clase encargada de crear el DOM de la seccion, operaciones, asi como creacion y envio 
//de los arreglos json de la seccion Asignacion de Recursos
export class Recursos{

  mesActual = null;
  focusActual = null;

  crearRecursos(){
    let seccion = document.getElementById('Recursos');
    let vista = ``;
    vista += `
    <h3>Recursos de Asignación</h3>    
    <table class="table table-striped table-bordered border-info table-dark text-center" id="tablaRecursos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody class="contenido-tabla">
        <tr>
          <th style="width: 10%;">Total</th>
          <td id="sumaTotal" style="width: 20%;">[sumaTotal]</td>
        </tr>
      </tbody>
    </table>
    
    <button class="btn btn-success" type="button" role="button" id="botonAgregarRecurso" style="margin-bottom: 15px;">Agregar Fila</button>
    <button class="btn btn-danger" type="button" role="button"  id="botonEliminarRecurso" style="margin-bottom: 15px;">Eliminar Fila</button>    
    `;
    seccion.innerHTML = vista;
    this.crearRecursosCostos();
    this.crearRecursosResumen();
  }

  agregarColumnaInicial(numeroMesInicial){
    this.mesActual = numeroMesInicial;
    let recursosColumna = [];
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaRecursos');
    let filas = tabla.querySelectorAll('tr');    
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length;
    
    filas.forEach((element, index) => {  
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){
        let rol = element.className;
        let costo = parseInt(element.querySelector('th').className,10);
        let recurso = { "idMes": celdas, "rol": rol, "porcentaje": 1, "costo": costo };
        recursosColumna.push(recurso);
        let imp = document.createElement('input');
        imp.setAttribute('type','number');
        imp.setAttribute('id',`input${rol}${celdas}`);
        imp.setAttribute('min','1');
        imp.setAttribute('max','100');
        imp.value = 1;
        imp.addEventListener('change', revisarValor);
        celda.textContent = "% " 
        celda.appendChild(imp);
        
      }else{
        celda.textContent = `[total${mes}]`;
      }
    });
    this.agregarColumnaInicialCostos(numeroMesInicial);
    this.agregarColumnaInicialResumen(numeroMesInicial);

    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }    
    return recursosColumna;
  }

  agregarColumna(){
    let mes = listaMeses[this.mesActual];
    let recursosColumna = [];
    let tabla = document.getElementById('tablaRecursos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length

    filas.forEach((element, index) => {
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){  
        let rol = element.className;
        let costo = parseInt(element.querySelector('th').className,10);
        let recurso = { "idMes": celdas, "rol": rol, "porcentaje": 1, "costo": costo };
        recursosColumna.push(recurso);
        let imp = document.createElement('input');
        imp.setAttribute('type','number');
        imp.setAttribute('id',`input${rol}${celdas}`);
        imp.setAttribute('min','1');
        imp.setAttribute('max','100');
        imp.value = 1;
        imp.addEventListener('change', revisarValor);
        celda.textContent = "% "
        celda.appendChild(imp);        
      }else{
        celda.textContent = `[total${mes}]`;
      }
         
    });
    this.agregarColumnaCostos();
    this.agregarColumnaResumen();

    this.mesActual ++;
    if (this.mesActual >= 12) { this.mesActual = 0; }    
    return recursosColumna; 
  }

  eliminarColumna(){
    let tabla = document.getElementById('Recursos');
    let filas = tabla.querySelectorAll('tr');
    let ultima = filas[0].querySelectorAll('td').length - 1;
    if (ultima > 0) {
      filas.forEach((element, index) => {
        element.deleteCell(ultima);
      });      
    }
    this.eliminarColumnaCostos();
    this.eliminarColumnaResumen();

    this.mesActual --;
    if (this.mesActual < 0) { this.mesActual = 11; }
  }

  agregarFila(rol, costo){
    let recursosFila = [];
    let tabla = document.getElementById('tablaRecursos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let nuevaFila = tabla.insertRow(numFilas-1);    
    nuevaFila.setAttribute('class',`${rol}`);
    let columnas = filas[0].querySelectorAll('td').length
    for (let index = 0; index <= columnas; index++) {      
      if (index == 0) {
        let celda = document.createElement('th');
        celda.setAttribute('class',`${costo}`);
        let vista = '';
        vista += `          
          <input type="radio" class="btn-check" name="roles" id="${rol}" autocomplete="off">
          <label class="btn btn-outline-primary" for="${rol}">${rol}</label>    
        `;        
        celda.innerHTML = vista; 
        nuevaFila.appendChild(celda);
        let boton = document.getElementById(rol);
        boton.addEventListener('change', () =>{
          this.focusActual = rol;
        });
      }
      else if(index != columnas){
        let recurso = { "idMes": index, "rol": rol, "porcentaje": 1, "costo": costo };
        recursosFila.push(recurso);
        let celda = nuevaFila.insertCell(index);
        let imp = document.createElement('input');
        imp.setAttribute('type','number');
        imp.setAttribute('id',`input${rol}${index}`);
        imp.setAttribute('min','1');
        imp.setAttribute('max','100');
        imp.value = 1;
        imp.addEventListener('change', revisarValor);
        celda.textContent = "% "
        celda.appendChild(imp);
      }else{
        let celda = nuevaFila.insertCell(index);
        celda.textContent = `[suma${rol}]`
      }            
    }
    this.agregarFilaCostos(rol, costo);
    this.agregarFilaResumen(rol);

    return recursosFila;
  }

  eliminarFila(rol){
    let tabla = document.getElementById("tablaRecursos");
    let fila = document.querySelector(`tr.${rol}`);
    tabla.deleteRow(fila.rowIndex);
    this.focusActual = null;
    this.eliminarFilaCostos(rol);
    this.eliminarFilaResumen(rol);
  }
  
  calcularValorRecursos(){
    let filasRecurso = document.getElementById("tablaRecursos").querySelectorAll('.contenido-tabla tr');
    let numFilas = filasRecurso.length;
    let numCeldas = filasRecurso[0].querySelectorAll('td').length;
    let filaFinal = [];

    for (let index = 0; index < numCeldas; index++) {
      filaFinal[index] = 0; 
    }    
    //console.log(filaFinal);
    //console.log("filas"+numFilas);
    //console.log("celdas:"+numCeldas);

    if (numFilas > 1) {
      filasRecurso.forEach((element, index) => {

        if (index < (numFilas-1)) {      
          let celdasRecurso = filasRecurso[index].querySelectorAll('td');
          let acumuluador = 0;          

          celdasRecurso.forEach((elemento, indice) => {
            if (indice < (numCeldas-1)) {
              let recurso = parseInt(celdasRecurso[indice].querySelector('input').value);  
              acumuluador += recurso;
              filaFinal[indice] += recurso;    
            }else{
              celdasRecurso[indice].textContent = acumuluador;
              filaFinal[indice] += acumuluador;             
            }            
          });          
        } else{
          let celdasRecurso = filasRecurso[index].querySelectorAll('td');

          celdasRecurso.forEach((elemento, indice) => {
            celdasRecurso[indice].textContent = filaFinal[indice];            
          });
        }        
      });      
    }
    else{
      let celdasRecurso = filasRecurso[0].querySelectorAll('td');
      celdasRecurso.forEach((elemento, indice) => {
        celdasRecurso[indice].textContent = 0;        
      });
      //alert("No hay suficientes datos")
    }
  }

  //Tabla de Costos de Recursos
  crearRecursosCostos(){
    let seccion = document.getElementById('RecursosCostos');
    let vista = ``;
    vista += `
    <h3>Costo de Asignacion de Recursos</h3>
    <table class="table table-striped table-bordered border-info table-dark text-center" id="tablaRecursosCostos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody class="contenido-tabla">
        <tr>
          <th style="width: 10%;">Total</th>
          <td id="sumaTotal" style="width: 20%;">[sumaTotal]</td>
        </tr>
      </tbody>
    </table>  
    `;
    seccion.innerHTML = vista;
  }

  agregarColumnaInicialCostos(numeroMesInicial){
    this.mesActual = numeroMesInicial;
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaRecursosCostos');
    let filas = tabla.querySelectorAll('tr');    
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length;
    
    filas.forEach((element, index) => {  
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){
        let costo = parseInt(element.querySelector('th').className,10);
        celda.textContent = costo; 
        
      }else{
        celda.setAttribute('id',`celda${mes}Total`);
        celda.textContent = `[total${mes}]`;
      }
    });
  }

  agregarColumnaCostos(){
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaRecursosCostos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length

    filas.forEach((element, index) => {
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){        
        let costo = parseInt(element.querySelector('th').className,10);        
        celda.textContent = costo;
      }else{
        celda.setAttribute('id',`celda${mes}Total`);
        celda.textContent = `[total${mes}]`;
      }
         
    });
  }

  eliminarColumnaCostos(){
    let seccion = document.getElementById('RecursosCostos');
    let filas = seccion.querySelectorAll('tr');
    let ultima = filas[0].querySelectorAll('td').length - 1;
    if (ultima > 0) {
      filas.forEach((element, index) => {
        element.deleteCell(ultima);
      });      
    }
  }

  agregarFilaCostos(rol, costo){
    let tabla = document.getElementById('tablaRecursosCostos');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let nuevaFila = tabla.insertRow(numFilas-1);    
    nuevaFila.setAttribute('class',`${rol}`);
    let columnas = filas[0].querySelectorAll('td').length
    for (let index = 0; index <= columnas; index++) {      
      if (index == 0) {
        let celda = document.createElement('th');
        celda.setAttribute('class',`${costo}`);
        celda.textContent = rol;  
        nuevaFila.appendChild(celda);        
      }
      else if(index != columnas){        
        let meses = filas[0].querySelectorAll('td');
        let celda = nuevaFila.insertCell(index);
        celda.setAttribute('id',`celda${meses[index-1].textContent}${numFilas-1}`);
        celda.textContent = costo;
      }else{
        let celda = nuevaFila.insertCell(index);
        celda.textContent = `[suma${rol}]`
      }            
    }
  }

  eliminarFilaCostos(rol){
    let tabla = document.getElementById("tablaRecursosCostos");
    let fila = document.querySelector(`tr.${rol}`);
    tabla.deleteRow(fila.rowIndex);
  }

  calcularValorCostos(){
    let filasCosto = document.getElementById("tablaRecursosCostos").querySelectorAll('.contenido-tabla tr');
    let numFilas = filasCosto.length;
    let numCeldas = filasCosto[0].querySelectorAll('td').length;
    let filaFinal = [];

    for (let index = 0; index < numCeldas; index++) {
      filaFinal[index] = 0; 
    }    
    //console.log(filaFinal);

    //console.log("filas"+numFilas);
    //console.log("celdas:"+numCeldas);

    if (numFilas > 1) {
      filasCosto.forEach((element, index) => {

        if (index < (numFilas-1)) {          
          let celdasCosto = filasCosto[index].querySelectorAll('td');
          let acumuluador = 0;

          celdasCosto.forEach((elemento, indice) => {
            if (indice < (numCeldas-1)) {
              let costo = parseInt(celdasCosto[indice].textContent, 10);

              acumuluador += costo;
              filaFinal[indice] += costo;    
            }else{
              celdasCosto[indice].textContent = acumuluador;
              filaFinal[indice] += acumuluador;             
            }            
          });          
        } else{
          let celdasCosto = filasCosto[index].querySelectorAll('td');

          celdasCosto.forEach((elemento, indice) => {
            celdasCosto[indice].textContent = filaFinal[indice];            
          });
        }        
      });      
    }
    else{
      let celdasCosto = filasCosto[0].querySelectorAll('td');
      celdasCosto.forEach((elemento, indice) => {
        celdasCosto[indice].textContent = 0;        
      });
      //alert("No hay suficientes datos")
    }


  }

  //Tabla Resumen de Recursos
  crearRecursosResumen(){
    let seccion = document.getElementById('RecursosResumen');
    let vista = ``;
    vista += `
    <h3>Resumen de Costos y Recursos</h3>
    <table class="table table-striped table-bordered border-info table-dark text-center" id="tablaRecursosResumen">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody class="contenido-tabla">
        <tr>
          <th style="width: 10%;">Total</th>
          <td id="sumaTotal" style="width: 20%;">[sumaTotal]</td>
        </tr>
      </tbody>
    </table>  
    `;
    seccion.innerHTML = vista;
  }

  agregarColumnaInicialResumen(numeroMesInicial){
    this.mesActual = numeroMesInicial;
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaRecursosResumen');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length;
    
    filas.forEach((element, index) => {  
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.setAttribute('id',`celda${mes}`);
        celda.textContent = mes;
      }else if (index != numFilas-1){
        celda.setAttribute('id',`celda${mes}${index}`);   
        celda.textContent = "[formula]";        
      }else{
        celda.setAttribute('id',`celda${mes}Total`);
        celda.textContent = `[total${mes}]`;
      }
    });
  }

  agregarColumnaResumen(){
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('tablaRecursosResumen');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let celdas = filas[0].querySelectorAll('td').length

    filas.forEach((element, index) => {
      let celda = element.insertCell(celdas);      
      if (index == 0) {
        celda.setAttribute('id',`celda${mes}`);
        celda.textContent = mes;
      }else if (index != numFilas-1){     
        celda.setAttribute('id',`celda${mes}${index}`);    
        celda.textContent = "[formula1]";
      }else{
        celda.setAttribute('id',`celda${mes}Total`);
        celda.textContent = `[total${mes}]`;
      }
         
    });
  }

  eliminarColumnaResumen(){
    let seccion = document.getElementById('RecursosResumen');
    let filas = seccion.querySelectorAll('tr');
    let ultima = filas[0].querySelectorAll('td').length - 1;
    if (ultima > 0) {
      filas.forEach((element, index) => {
        element.deleteCell(ultima);
      });      
    }

  }

  agregarFilaResumen(rol){
    let tabla = document.getElementById('tablaRecursosResumen');
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let nuevaFila = tabla.insertRow(numFilas-1);    
    nuevaFila.setAttribute('class',`${rol}`);
    let columnas = filas[0].querySelectorAll('td').length
    for (let index = 0; index <= columnas; index++) {      
      if (index == 0) {
        let celda = document.createElement('th');
        celda.textContent = rol;  
        nuevaFila.appendChild(celda);        
      }
      else if(index != columnas){
        let meses = filas[0].querySelectorAll('td');
        let celda = nuevaFila.insertCell(index);
        celda.setAttribute('id',`celda${meses[index-1].textContent}${numFilas-1}`);
        celda.textContent = "[Formula3]";
      }else{
        let celda = nuevaFila.insertCell(index);
        celda.textContent = `[suma${rol}]`
      }            
    }
  }

  eliminarFilaResumen(rol){
    let tabla = document.getElementById("tablaRecursosResumen");
    let fila = document.querySelector(`tr.${rol}`);
    tabla.deleteRow(fila.rowIndex);
  }

  calcularValorResumen(){
    let filasResumen = document.getElementById("tablaRecursosResumen").querySelectorAll('.contenido-tabla tr');
    let filasRecurso = document.getElementById("tablaRecursos").querySelectorAll('.contenido-tabla tr');
    let filasCosto = document.getElementById("tablaRecursosCostos").querySelectorAll('.contenido-tabla tr');
    let numFilas = filasResumen.length;
    let numCeldas = filasResumen[0].querySelectorAll('td').length;
    let filaFinal = [];

    for (let index = 0; index < numCeldas; index++) {
      filaFinal[index] = 0; 
    }    
    //console.log(filaFinal);

    //console.log("filas"+numFilas);
    //console.log("celdas:"+numCeldas);

    if (numFilas > 1) {
      filasResumen.forEach((element, index) => {

        if (index < (numFilas-1)) {
          let celdasResumen = filasResumen[index].querySelectorAll('td');
          let celdasRecurso = filasRecurso[index].querySelectorAll('td input');
          let celdasCosto = filasCosto[index].querySelectorAll('td');
          let acumuluador = 0;      

          celdasResumen.forEach((elemento, indice) => {
            if (indice < (numCeldas-1)) {
              let costo = parseInt(celdasCosto[indice].textContent, 10);
              let recurso = parseInt(celdasRecurso[indice].value,10);
              let resultado = ((recurso / 100) * costo);
                                 
              celdasResumen[indice].textContent = resultado;
              acumuluador += resultado;
              filaFinal[indice] += resultado;    
            }else{
              celdasResumen[indice].textContent = acumuluador;
              filaFinal[indice] += acumuluador;              
            }            
          });          
        } else{
          let celdasResumen = filasResumen[index].querySelectorAll('td');

          celdasResumen.forEach((elemento, indice) => {
            celdasResumen[indice].textContent = filaFinal[indice];                    
          });
        }        
      });      
    }
    else{
      let celdasResumen = filasResumen[0].querySelectorAll('td');
      celdasResumen.forEach((elemento, indice) => {
        celdasResumen[indice].textContent = 0;        
      });
      //alert("No hay suficientes datos")
    }
  }

  guardarValor(recursos){
    
    let numColumnasA = recursos.length;    
    let numFilasA = recursos[0].length;

    //console.log("tabla Recursos tamaño:");
    //console.log("filas: " + numFilasA + " Columnas: " + numColumnasA);
    

    let filasR = document.getElementById("tablaRecursos").querySelectorAll('.contenido-tabla tr');

    for (let index = 0; index < numFilasA; index++) {

      let celdasR = filasR[index].querySelectorAll('td');
      let rolR = filasR[index].className;
      let costoR = filasR[index].querySelector('th').className;

      for (let indice = 0; indice < numColumnasA; indice++) {        
        let porcentajeR = celdasR[indice].querySelector('input').value; 

       // console.log("Fila:"+index+" columna:"+indice);
       // console.log("Rol: "+rolR +" Porcentaje: "+porcentajeR+ " Costo: " + costoR );

        recursos[indice][index].rol = rolR;
        recursos[indice][index].porcentaje = parseInt(porcentajeR,10);
        recursos[indice][index].costo = parseInt(costoR,10) ;
      }            
    }
  }


}

