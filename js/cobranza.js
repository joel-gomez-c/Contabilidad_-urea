// let texto1 = document.getElementById("texto1");
let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");

var ctxOne = document.getElementById('chartOne').getContext('2d');
var chartOne = new Chart(ctxOne, {
    type: 'pie',
    data: {
        labels: ['IVA Suma de IMPUESTOS PAGADOS', 'ISR Suma de INGRESOS COBRADOS', 'ISR Suma de IMPUESTOS PAGADOS'],
        datasets: [{
            label: 'Dataset 1',
            data: [40, 25, 25, 10],
            backgroundColor: [
                'blue',
                'yellow',
                'green',
                'orange'
            ]
        }]
    },
    options: {
        // plugins: {
        //     legend: {
        //         position: 'down'
        //     }
        // },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true
        // Configuración para la gráfica en 3D
        // plugins: {
        //     chartJsPlugin3d: {
        //         enabled: true,
        //         alpha: 45,
        //         beta: 0
        //     }
        // }
    }
});

var ctxTwo = document.getElementById('chartTwo').getContext('2d');
var chartTwo = new Chart(ctxTwo, {
    type: 'bar',
    data: {
        labels: ['Ernesto Eduardo Vargas Blanco', 'Público en general', 'Miguel Ángel Jarillo Girón', 'Estebán Emilio Perdome'],
        datasets: [{
            label: 'Total',
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            data: [6960, 18232, 19952, 32480]
        }]
    },
    options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        },
        indexAxis: 'y',
        responsive: true
    }
});

function iniciarPagina(){
    if(this.localStorage.getItem("nombre")!=null){
        nombre = String(this.localStorage.getItem("nombre"));
        enlace = String(this.localStorage.getItem("enlace"));

        user_name.innerText = `${nombre}`;

    }//if != null
}

logOut.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("nombre");
    localStorage.removeItem("enlace");
    // localStorage.removeItem("usuario");
    // localStorage.removeItem("contraseña");
    window.location.href = "../html/login.html";
});

// import turnos from "./turnos.js";

// const turnosContainer = document.getElementById("turnosContainer");
// const detalleContainer = document.getElementById("detalleContainer");
// let indiceSeleccionado;

// const clienteElement = document.getElementById("cliente");
// const modeloElement = document.getElementById("modelo");
// const problemaElement = document.getElementById("problema");
// const comentarioElement = document.getElementById("comentario");
// const marcarTerminadoElement = document.getElementById("finalizar");


// function createTarjeta(turno,index){
//   const nuevaTarjeta = document.createElement("div");
//   nuevaTarjeta.classList = "tarjeta";
//   nuevaTarjeta.innerHTML = `
//     <h3>${turno.cliente}</h3>
//     <p>${turno.email}</p>
//     <p>${turno.modelo}</p>
//     <p>${turno.problema}</p>
//   `
//   nuevaTarjeta.addEventListener("click", ()=> actualizarDetalle(index))
//   turnosContainer.appendChild(nuevaTarjeta);
// }

// function actualizarTarjetas(){
//   turnosContainer.innerHTML = "";
//   turnos.forEach((turno,i) => {
//     createTarjeta(turno,i);
//   })
// }

// function actualizarDetalle(index){
//   if(indiceSeleccionado !== undefined) turnosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",false);
//   clienteElement.innerText = turnos[index].cliente;
//   modeloElement.innerText = turnos[index].modelo;
//   problemaElement.innerText = turnos[index].problema;
//   detalleContainer.classList.toggle("escondido",false);
//   indiceSeleccionado = index;
//   turnosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",true);
// }

// finalizar.addEventListener("click",()=> marcarTerminado(indiceSeleccionado))

// async function marcarTerminado(i){
//   const updateTurno = turnos[i];
//   updateTurno.comentario = comentarioElement.value;
//   const res = await editTurno(updateTurno.id,updateTurno);
//   if(res.status === 200){
//     turnos = turnos.filter(turno => turno.id !== updateTurno.id);
//     indiceSeleccionado = 0;
//     await actualizarTarjetas()
//     detalleContainer.classList.toggle("escondido",true);
//     comentarioElement.value="";
//   }
// }
