const listaMeses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];


function realizarCalculos(a){
  console.log(a.target.id+" cambio a "+a.target.value);
}


export class ResumenFinanciero{

  crearResumenFinanciero(){
    let tabla = document.getElementById('ResumenFinanciero');
    let vista = ``;
    vista += `
    <h3>Resumen Financiero</h3>
    <table class="table table-bordered table-striped table-primary text-center" style="max-width: 600px;">
      <thead>
      </thead>
      <tbody id="contenido-tabla">
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
    tabla.innerHTML = vista;
  }

}

export class FlujoDeEfectivo{

   mesActual = null;

  crearFlujoDeEfectivo(){
    let tabla = document.getElementById('FlujoDeEfectivo');
    let vista = ``;
    vista += `
    <h3>Flujo de Efectivo</h3>
    <table class="table table-striped table-bordered table-dark text-center" id="tablaFlujoDeEfectivo">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>        
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody id="contenido-tabla">
        <tr>
          <th style="width: 10%;">Ingresos</th>
          <td style="width: 20%;"></td>        
        </tr>
        <tr>
          <th style="width: 10%;">Egresos</th>
          <td style="width: 20%;"></td>
        </tr>
        <tr>
          <th style="width: 10%;">Total</th>
          <td style="width: 20%;"></td>
        </tr>
        <tr>
          <th style="width: 10%;">Acumulado</th>
          <td style="width: 20%;"></td>
        </tr>
      </tbody>
    </table>
  
    <button class="btn btn-success" type="button" role="button" style="margin-bottom: 15px;" id="botonAgregarMes">Agregar Columna</button>
    <button class="btn btn-danger" type="button" role="button" style="margin-bottom: 15px;" id="botonEliminarMes">Eliminar Columna</button>
  
  `;
    tabla.innerHTML = vista;
  }

  agregarColumnaInicial(idPresupuesto, numeroMesInicial, cantidad){
    this.mesActual = numeroMesInicial;
    let mes = listaMeses[this.mesActual];
    let mesTabla = { "idPresupuesto": idPresupuesto, "inicial": true, "nombre": mes, "cantidad": cantidad };
    let tabla = document.getElementById('tablaFlujoDeEfectivo');
    let filas = tabla.querySelectorAll('tr');
    filas.forEach((element, index) => {
      let celda = element.insertCell(element.querySelectorAll('td').length);
      celda.setAttribute('id',`celda${mes}${index}`);
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
      celda.setAttribute('id',`celda${mes}${index}`);
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
  

}

export class EstadoDeResultados{
  mesActual = null;

  crearEstadoDeResultados(){
    let tabla = document.getElementById('EstadoDeResultados');
    let vista = ``;
    vista += `
    <h3>Estado de Resultados</h3>
    <table class="table table-striped table-bordered table-success text-center" id="tablaEstadoDeResultados">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</th>    
        </tr>
      </thead>
      <tbody id="contenido-tabla">
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
          <th style="width: 10%;">Saldo Final</th>
          <td style="width: 20%;"></td>
        </tr>
      </tbody>
    </table>
    `;
    tabla.innerHTML = vista;  
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

}

export class Ingresos{
  mesActual = null;

  crearIngresos(){
    let tabla = document.getElementById('Ingresos');
    let vista = ``;
    vista += `
    <h3>Ingresos</h3>
    <table class="table table-striped table-bordered table-dark text-center" id="tablaIngresos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</th>    
        </tr>
      </thead>
      <tbody id="contenido-tabla">
        <tr>
          <th style="width: 10%;">Total</th>
          <td style="width: 20%;"></td>
        </tr>
      </tbody>
    </table>
    
    <button class="btn btn-success" type="button" role="button" id="botonAgregarIngreso" style="margin-bottom: 15px;">Agregar Fila</button>
    <button class="btn btn-danger" type="button" role="button"  id="botonEliminarIngreso" style="margin-bottom: 15px;">Eliminar Fila</button>    
    `;
    tabla.innerHTML = vista;
  }

  agregarColumnaInicial(numeroMesInicial){
    this.mesActual = numeroMesInicial;
    let mes = listaMeses[this.mesActual];
    let tabla = document.getElementById('Ingresos');
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
    let tabla = document.getElementById('Ingresos');
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

  agregarFila(){
    let tabla = document.getElementById('tablaIngresos');  
    let filas = tabla.querySelectorAll('tr');
    let numFilas = filas.length;
    let nuevaFila = tabla.insertRow(numFilas-1);
    let columnas = filas[0].querySelectorAll('td').length
    for (let index = 0; index <= columnas; index++) {
      nuevaFila.insertCell(0);      
    } 
    
  }

}