const listaMeses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];


function realizarCalculos(a){
  console.log(a.target.id+" cambio a "+a.target.value);
}

function revisarValor(a){
  if (a.target.value < 1 || a.target.value > 100 || a.target.value == null){
    alert("El valor ingresado debe estar entre 1 y 100");
    a.target.value = 1;
    //console.log(a.target.id+" cambio a "+a.target.value);    
  }
  
}


export class ResumenFinanciero{

  crearResumenFinanciero(){
    let seccion = document.getElementById('ResumenFinanciero');
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
    seccion.innerHTML = vista;
  }

}

export class FlujoDeEfectivo{

   mesActual = null;

  crearFlujoDeEfectivo(){
    let seccion = document.getElementById('FlujoDeEfectivo');
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
    let seccion = document.getElementById('EstadoDeResultados');
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

}

export class Ingresos{
  mesActual = null;
  focusActual = null;

  crearIngresos(){
    let seccion = document.getElementById('Ingresos');
    let vista = ``;
    vista += `
    <h3>Ingresos</h3>
    <table class="table table-striped table-bordered table-dark text-center" id="tablaIngresos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody id="contenido-tabla">
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
      //console.log("agregandooo en"+celdas);
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
    nuevaFila.setAttribute('class',`concepto_${concepto}`);
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
}

export class CostosDirectos{

  mesActual = null;
  focusActual = null;
  opcionActual = null;

  crearCostosDirectos(){
    let seccion = document.getElementById('Costos');
    let vista = ``;
    
    vista += `
    <h3>Costos Directos</h3>
    <table class="table table-striped table-bordered table-dark text-center" id="tablaCostos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody id="contenido-tabla">        
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

    filas.forEach((element, index) => {
      let concepto = element.className;
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){        
        if (element.querySelector('th').className == `${concepto}Op1`) {
          opcion = 1;       
        }else if (element.querySelector('th').className == `${concepto}Op2`){
          opcion = 2;
        }else if (element.querySelector('th').className == `${concepto}Op3`) {
          opcion = 3;
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
        } else if (opcion == 3) {
          costo.opcion = 3;
          costo.cantidad = null;
          costo.opcionDos = null;
          costo.opcionTres = "tablaRecursos";
          celda.textContent = "opcion tipo 3";
        } else{
          costo = null;
          celda.textContent = "Sepa";
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
    let celdas = filas[0].querySelectorAll('td').length

    filas.forEach((element, index) => {
      let concepto = element.className;
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){  
        if (element.querySelector('th').className == `${concepto}Op1`) {
          opcion = 1;       
        }else if (element.querySelector('th').className == `${concepto}Op2`){
          opcion = 2;
        }else if (element.querySelector('th').className == `${concepto}Op3`) {
          opcion = 3;
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
          
        } else if (opcion == 3) {
          costo.opcion = 3;
          costo.cantidad = null;
          costo.opcionDos = null;
          costo.opcionTres = "tablaRecursos";
          celda.textContent = "opcion tipo 3"
        } else{
          costo = null;
          celda.textContent = "Sepa"
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

  agregarFila(concepto, opcion, cantidad){
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
        celda.setAttribute('class',`${concepto}Op${opcion}`);
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
        } else if (opcion == 3) {
          costo.opcion = 3;
          costo.cantidad = null;
          costo.opcionDos = null;
          costo.opcionTres = "tablaRecursos";
          celda.textContent = "opcion tipo 3";
        } else{
          costo = null;
          celda.textContent = "Sepa";
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
}

export class GastosAdministrativos{

  mesActual = null;
  focusActual = null;
  opcionActual = null;

  crearGastosAdministrativos(){
    let seccion = document.getElementById('Gastos');
    let vista = ``;
    
    vista += `
    <h3>Gastos Administrativos</h3>
    <table class="table table-striped table-bordered table-dark text-center" id="tablaGastos">
      <thead>
        <tr>
          <th scope="col" style="width: 4%;"></th>
          <td scope="col">Sumatoria</td>    
        </tr>
      </thead>
      <tbody id="contenido-tabla">        
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

    filas.forEach((element, index) => {
      let concepto = element.className;
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){        
        if (element.querySelector('th').className == `${concepto}Op1`) {
          opcion = 1;       
        }else if (element.querySelector('th').className == `${concepto}Op2`){
          opcion = 2;
        }else if (element.querySelector('th').className == `${concepto}Op3`) {
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
          celda.textContent = "opcion tipo 2";          
        } else if (opcion == 3) {
          gasto.opcion = 3;
          gasto.cantidad = null;
          gasto.opcionDos = null;
          gasto.opcionTres = "tablaRecursos";
          celda.textContent = "opcion tipo 3";
        } else{
          gasto = null;
          celda.textContent = "Sepa";
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
    let celdas = filas[0].querySelectorAll('td').length

    filas.forEach((element, index) => {
      let concepto = element.className;
      let celda = element.insertCell(celdas);
      celda.setAttribute('id',`celda${mes}${index}`);
      if (index == 0) {
        celda.textContent = mes;
      }else if (index != numFilas-1){  
        if (element.querySelector('th').className == `${concepto}Op1`) {
          opcion = 1;       
        }else if (element.querySelector('th').className == `${concepto}Op2`){
          opcion = 2;
        }else if (element.querySelector('th').className == `${concepto}Op3`) {
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
          
        } else if (opcion == 3) {
          gasto.opcion = 3;
          gasto.cantidad = null;
          gasto.opcionDos = null;
          gasto.opcionTres = "tablaRecursos";
          celda.textContent = "opcion tipo 3"
        } else{
          gasto = null;
          celda.textContent = "Sepa"
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

  agregarFila(concepto, opcion, cantidad){
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
        celda.setAttribute('class',`${concepto}Op${opcion}`);
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
          gasto.opcionDos = "tablaRecursos";          
          gasto.opcionTres = null;
          celda.textContent = "opcion tipo 2"; 
        } else if (opcion == 3) {
          gasto.opcion = 3;
          gasto.cantidad = null;
          gasto.opcionDos = null;
          gasto.opcionTres = "tablaRecursos";
          celda.textContent = "opcion tipo 3";
        } else{
          gasto = null;
          celda.textContent = "Sepa";
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
}

export class Recursos{

  mesActual = null;
  focusActual = null;

  crearRecursos(){
    let seccion = document.getElementById('Recursos');
    let vista = ``;
    vista += `
    <h3>Recursos de Asignación</h3>
    <table class="table table-striped table-bordered table-dark text-center" id="tablaRecursos">
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
      alert("No hay suficientes datos")
    }
  }

  //Tabla de Costos de Recursos
  crearRecursosCostos(){
    let seccion = document.getElementById('RecursosCostos');
    let vista = ``;
    vista += `
    <h3>Costo de Asignacion de Recursos</h3>
    <table class="table table-striped table-bordered table-dark text-center" id="tablaRecursosCostos">
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
      alert("No hay suficientes datos")
    }


  }

  //Tabla Resumen de Recursos
  crearRecursosResumen(){
    let seccion = document.getElementById('RecursosResumen');
    let vista = ``;
    vista += `
    <h3>Resumen de Costos y Recursos</h3>
    <table class="table table-striped table-bordered table-dark text-center" id="tablaRecursosResumen">
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
      alert("No hay suficientes datos")
    }
  }
}