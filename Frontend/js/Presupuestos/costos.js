import { Calcular, listaMeses } from "../edicion.js";

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
          imp.addEventListener('change', Calcular);
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
          imp.addEventListener('change', Calcular);
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
          imp.addEventListener('change', Calcular);
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