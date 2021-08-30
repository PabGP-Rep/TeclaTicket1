import { listaMeses, Calcular } from "../edicion.js";

//Funcion para revisar que el valor ingresado en un editable este entre  1 y 100
function revisarValor(a){
  if (a.target.value < 1 || a.target.value > 100 || a.target.value == null){
    alert("El valor ingresado debe estar entre 1 y 100");
    a.target.value = 1;    
  }  
  Calcular(a);
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
    }
  }

  guardarValor(recursos){    
    let numColumnasA = recursos.length;    
    let numFilasA = recursos[0].length;    

    let filasR = document.getElementById("tablaRecursos").querySelectorAll('.contenido-tabla tr');

    for (let index = 0; index < numFilasA; index++) {

      let celdasR = filasR[index].querySelectorAll('td');
      let rolR = filasR[index].className;
      let costoR = filasR[index].querySelector('th').className;

      for (let indice = 0; indice < numColumnasA; indice++) {        
        let porcentajeR = celdasR[indice].querySelector('input').value; 

        recursos[indice][index].rol = rolR;
        recursos[indice][index].porcentaje = parseInt(porcentajeR,10);
        recursos[indice][index].costo = parseInt(costoR,10) ;
      }            
    }
  }

}