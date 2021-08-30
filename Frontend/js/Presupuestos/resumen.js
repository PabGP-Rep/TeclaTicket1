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







