import { Calcular, listaMeses } from "../edicion.js";

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
        imp.addEventListener('change', Calcular);
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
        imp.addEventListener('change', Calcular);
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
        imp.addEventListener('change', Calcular);
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

    if (numFilas > 1) {
      filasIngreso.forEach((element, index) => {

        if (index < (numFilas-1)) {  
          let celdasIngreso = filasIngreso[index].querySelectorAll('td');
          let acumulador = 0;          

          celdasIngreso.forEach((elemento, indice) => {
            if (indice < (numCeldas-1)) {
              let ingreso = parseInt(celdasIngreso[indice].querySelector('input').value);
              acumulador += ingreso;
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
    }    
  }

  guardarValor(ingresos){    
    let numColumnasA = ingresos.length;    
    let numFilasA = ingresos[0].length;
    let filasI = document.getElementById("tablaIngresos").querySelectorAll('.contenido-tabla tr');

    for (let index = 0; index < numFilasA; index++) {
      let celdasI = filasI[index].querySelectorAll('td');
      let conceptoI = filasI[index].className; 

      for (let indice = 0; indice < numColumnasA; indice++) {          
        let cantidad = parseInt(celdasI[indice].querySelector('input').value,10);   
        ingresos[indice][index].concepto = conceptoI;
        ingresos[indice][index].cantidad = cantidad;
      }            
    }
  }
  
}