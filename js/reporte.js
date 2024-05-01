let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");
let infoOne = document.getElementById("infoOne");
let infoTwo = document.getElementById("infoTwo");
let infoThree = document.getElementById("infoThree");
let infoFour = document.getElementById("infoFour");
let infoFive = document.getElementById("infoFive");
//let texto1 = document.getElementById("texto1");

var ctxLine = document.getElementById('lineChart').getContext('2d');
var lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
            label: 'Suma de INGRESOS COBRADOS',
            data: [61, 78, 72, 61, 65, 76, 70, 75, 59, 59, 65, 77],
            borderColor: 'blue',
            borderWidth: 1
        },
        {
            label: 'Suma de GASTOS PAGADOS',
            data: [76, 77, 65, 59, 71, 64, 58, 84, 73, 70, 82, 60],
            borderColor: 'yellow',
            borderWidth: 1
        }]
    },
    options: {
        // legend: {
        //     display: false // Oculta la leyenda completa
        // },
        responsive: true,
        maintainAspectRatio: false
    }
});

var ctxBar = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Suma de INGRESOS COBRADOS', 'Suma de GASTOS PAGADOS'],
        datasets: [{
            label: 'Suma de INGRESOS COBRADOS',
            data: [174127, 0],
            backgroundColor: 'blue',
            //borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Suma de GASTOS PAGADOS',
            data: [0, 47957],
            backgroundColor: 'yellow', // Color de la segunda barra
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: false
    }
});

var ctxPie = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['IVA Suma de IMPUESTOS PAGADOS', 'ISR Suma de INGRESOS COBRADOS', 'ISR Suma de IMPUESTOS PAGADOS'],
        datasets: [{
            label: 'Dataset 1',
            data: [90, 8, 2],
            backgroundColor: [
                'red',
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
        responsive: false
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
var ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
var doughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
        labels: ['Retenciones ISR', 'Actualizaciones y recargos', 'ISR', 'Retenciones IVA', 'IVA', 'Actualizaciones y recargos IVA'],
        datasets: [{
            label: 'Dataset 1',
            data: [8, 0, 11, 69, 11, 1],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'green',
                'purple',
                'orange'
            ]
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: false
    }
});

// URL del archivo CSV
// const url = '../src/extra/data.csv';

// Función para cargar y procesar el archivo CSV
// fetch(url)
//   .then(response => response.text())
//   .then(data => {
//     // Dividir el archivo CSV en filas
//     const rows = data.split('\n');
//     // Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
//     for (let i = 1; i < rows.length; i++) {
//       const row = rows[i].split(',');
//       const nombre = row[0];
//       const usuario = row[1];
//       const contraseña = row[2];
//       const enlace = row[3];
//       // Procesar los datos como desees (por ejemplo, mostrarlos en la consola)
//       console.log(`Nombre: ${nombre}, Usuario: ${usuario}, Contraseña: ${contraseña}, Enlace: ${enlace}`);
//     }
//   })
//   .catch(error => {
//     console.error('Error al cargar el archivo CSV:', error);
//   });

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("nombre")!=null){
        nombre = String(this.localStorage.getItem("nombre"));
        enlace = String(this.localStorage.getItem("enlace"));

        // let fecha = new Date();
        // let hora = fecha.getHours();
        // console.log(hora);
        // if(hora>=0 && hora<12){
        //     //console.log("Buenos días");
        //     texto1.innerText = `Buenos días ${nombre}`;
        // }else if(hora>=12 && hora<20){
        //     //console.log("Buenas tardes");
        //     texto1.innerText = `Buenas tardes ${nombre}`;
        // }else{
        //     //console.log("Buenas noches");
        //     texto1.innerText = `Buenas noches ${nombre}`;
        // }

        user_name.innerText = `${nombre}`;

    }//if != null

});//window load

logOut.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("nombre");
    localStorage.removeItem("enlace");
    // localStorage.removeItem("usuario");
    // localStorage.removeItem("contraseña");
    window.location.href = "../html/login.html";
});

infoOne.addEventListener("click", function(event) {
    event.preventDefault();
    window.alert("Los meses en la parte superior controlan todas las tablas y gráficas, así que, puedes analizar todo el año o por meses separados");
});

infoTwo.addEventListener("click", function(event) {
    event.preventDefault();
    window.alert("En este apartado podrás encontrar todos tus ingresos y gastos facturados, así como, identificar a los más representativos.");
});

infoThree.addEventListener("click", function(event) {
    event.preventDefault();
    window.alert("En la gráfica podrás ver el % que representa del 100% de ingresos, los pagos de impuestos y el porcentaje que queda después de quitar impuestos (rojo)");
});

infoFour.addEventListener("click", function(event) {
    event.preventDefault();
    window.alert("En las dos tablas puedes ver el cálculo de cada mes, (ISR e IVA), Y el estatus de la declaración del siguiente mes.");
});

infoFive.addEventListener("click", function(event) {
    event.preventDefault();
    window.alert("Para ver el cálculo anual, selecciona de Enero - Diciembre");
});
