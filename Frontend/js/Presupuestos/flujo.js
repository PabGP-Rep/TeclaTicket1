import { Calcular, listaMeses } from "../edicion.js";

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
       imp.addEventListener('change', Calcular);
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
       imp.addEventListener('change', Calcular);
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