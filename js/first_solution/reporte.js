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
let arrayOne = [152951.00,21176.00,97903.45,89800.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayTwo = [0.00,0.00,0.00,56154.12,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayThree = [152951.00,21176.00,97903.45,89800.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayFour = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayFive = [3059.00,212.00,1958.00,1796.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];

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

window.addEventListener("load", function (event) {
    event.preventDefault();
    if (this.localStorage.getItem("nombre") != null) {
        nombre = String(this.localStorage.getItem("nombre"));
        enlace = String(this.localStorage.getItem("enlace"));

        user_name.innerText = `${nombre}`;

    }//if != null

});//window load

logOut.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("nombre");
    localStorage.removeItem("enlace");
    window.location.href = "../../index.html";
});

infoOne.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("Los meses controlan todas las tablas y gráficas, así que, puedes analizar todo el año o por meses separados");
});

infoTwo.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("En este apartado podrás encontrar todos tus ingresos y gastos facturados, así como, identificar a los más representativos.");
});

infoThree.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("En la gráfica podrás ver el % que representa del 100% de ingresos, los pagos de impuestos y el porcentaje que queda después de quitar impuestos (rojo)");
});

infoFour.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("En las dos tablas puedes ver el cálculo de cada mes, (ISR e IVA), Y el estatus de la declaración del siguiente mes.");
});

infoFive.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("Para ver el cálculo anual, selecciona de Enero - Diciembre");
});

var ctxLine = document.getElementById('lineChart').getContext('2d');
var lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
            label: 'Suma de INGRESOS COBRADOS',
            data: arrayOne,
            borderColor: 'blue',
            borderWidth: 1
        },
        {
            label: 'Suma de GASTOS PAGADOS',
            data: arrayTwo,
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
        // scales: {
        //     y: {
        //         beginAtZero: true,
        //         suggestedMax: 70000 // Sugerir un rango máximo
        //     }
        // }
    }
});

const suma1 = arrayOne.reduce((anterior, actual) => anterior + actual, 0);
const suma2 = arrayTwo.reduce((anterior, actual) => anterior + actual, 0);

var ctxBar = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Suma de INGRESOS COBRADOS', 'Suma de GASTOS PAGADOS'],
        datasets: [{
            label: 'Suma de INGRESOS COBRADOS',
            data: [suma1, 0],
            backgroundColor: 'blue',
            //borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Suma de GASTOS PAGADOS',
            data: [0, suma2],
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

const suma3 = arrayThree.reduce((anterior, actual) => anterior + actual, 0);
const suma4 = arrayFour.reduce((anterior, actual) => anterior + actual, 0);
const suma5 = arrayFive.reduce((anterior, actual) => anterior + actual, 0);

var ctxPie = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['IVA Suma de IMPUESTOS PAGADOS', 'ISR Suma de INGRESOS COBRADOS', 'ISR Suma de IMPUESTOS PAGADOS'],
        datasets: [{
            label: 'Dataset 1',
            data: [suma5, suma3, suma4],
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
