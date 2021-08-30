import { listaMeses } from "../edicion.js";

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
      if (index == 1){ }      
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
      if (index == 1){ }      
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

    if (numCeldas > 1) {
      filasResultado.forEach((element, index) => {
        if (index < 3) {
          let celdasResultado = filasResultado[index].querySelectorAll('td');
          let acumulador = 0;          

          celdasResultado.forEach((elemento, indice) => {
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
    }
  }
}