import { Calcular, listaMeses } from "../edicion.js";

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
          imp.addEventListener('change', Calcular);
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
          imp.addEventListener('change', Calcular);
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
          imp.addEventListener('change', Calcular);
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
    }    
  }

  guardarValor(gastos){    
    let numColumnasA = gastos.length;    
    let numFilasA = gastos[0].length;
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

        gastos[indice][index].concepto = conceptoG;
        gastos[indice][index].opcion = opcion;
        gastos[indice][index].cantidad = cantidad
        gastos[indice][index].opcionDos = opcionDos;
        gastos[indice][index].opcionTres = opcionTres;
      }            
    }
  }

}