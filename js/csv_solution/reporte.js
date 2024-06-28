let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");
// let infoOne = document.getElementById("infoOne");
let infoTwo = document.getElementById("infoTwo");
let infoThree = document.getElementById("infoThree");
let infoFour = document.getElementById("infoFour");
// let infoFive = document.getElementById("infoFive");
// const url = '../../src/data/a_rosas/reporte.csv';
// const urlTwo = '../../src/data/a_rosas/datos.csv';
//let texto1 = document.getElementById("texto1");
let arrayOne = [152951.00,21176.00,97903.45,89800.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayTwo = [0.00,0.00,0.00,56154.12,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayThree = [152951.00,21176.00,97903.45,89800.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayFour = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayFive = [3059.00,212.00,1958.00,1796.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arraySix = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arraySeven = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayEight = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayNine = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayTen = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
let arrayEleven = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];

var ctxPie = document.getElementById('pieChart').getContext('2d');
var ctxLine = document.getElementById('lineChart').getContext('2d');
var ctxBar = document.getElementById('barChart').getContext('2d');
var ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');

// Get the table body element
const tableBody = document.getElementById('tableOne').getElementsByTagName('tbody')[0];
// Clear any existing rows
tableBody.innerHTML = '';

const tableBodyTwo = document.getElementById('tableTwo').getElementsByTagName('tbody')[0];
tableBodyTwo.innerHTML = '';

const tableBodyThree = document.getElementById('tableThree').getElementsByTagName('tbody')[0];
tableBodyThree.innerHTML = '';

const tableBodyFour = document.getElementById('tableFour').getElementsByTagName('tbody')[0];
tableBodyFour.innerHTML = '';

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

// infoOne.addEventListener("click", function (event) {
//     event.preventDefault();
//     window.alert("Los meses controlan todas las tablas y gráficas, así que, puedes analizar todo el año o por meses separados");
// });

infoTwo.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("En este apartado podrás encontrar todos tus ingresos y gastos facturados, así como, identificar a los más representativos.");
});

infoThree.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("En la gráfica podrás ver el % que representa del 100% de ingresos, los pagos de impuestos y el porcentaje que queda después de quitar impuestos (verde)");
});

infoFour.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("En las dos tablas puedes ver el cálculo de cada mes, (ISR e IVA), Y el estatus de la declaración del siguiente mes.");
});

// infoFive.addEventListener("click", function (event) {
//     event.preventDefault();
//     window.alert("Para ver el cálculo anual, selecciona de Enero - Diciembre");
// });

// console.log(String(this.localStorage.getItem("enlace")) + 'reporte.csv');
// console.log(String(this.localStorage.getItem("enlace")) + 'datos.csv');

fetch(String(this.localStorage.getItem("enlace")) + 'reporte.csv')
    .then(response => response.text())
    .then(data => {
        // Dividir el archivo CSV en filas
        const rows = data.split('\n');
        let tamano1 = 1;
        let tamano2 = 1;

        if(String(this.localStorage.getItem("nombre"))=='Alejandro Rosas'){
            tamano1 = 10;
            tamano2 = 5;
        }else if(String(this.localStorage.getItem("nombre"))=='Miguel Jarillo'){
            tamano1 = 16;
            tamano2 = 43;
        }
        else if(String(this.localStorage.getItem("nombre"))=='Monica Labra'){
            tamano1 = 8;
            tamano2 = 9;
        }else if(String(this.localStorage.getItem("nombre"))=='Pilar Estrada'){
            tamano1 = 7;
            tamano2 = 6;
        }else if(String(this.localStorage.getItem("nombre"))=='Rey Posadas'){
            tamano1 = 13;
            tamano2 = 9;
        }
        // Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
        //console.log(rows);
        for (let i = 3; i < tamano1; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        </tr>`;
            tableBody.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 3; i < tamano2; i++) {
            const row = rows[i].split(',');
            //rows.length
            const fila = `<tr>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
        <td>${row[6]}</td>
        <td>${row[7]}</td>
        <td>${row[8]}</td>
        </tr>`;
            tableBodyTwo.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 38; i < 46; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        </tr>`;
            tableBodyThree.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 53; i < 64; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
        </tr>`;
            tableBodyFour.insertAdjacentHTML("beforeend", fila);
        }
    })
    .catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
    });

fetch(String(this.localStorage.getItem("enlace")) + 'datos.csv')
    .then(response => response.text())
    .then(data => {
        // Dividir el archivo CSV en filas
        const rows = data.split('\n');
        arrayOne = [];
        arrayTwo = [];
        arrayThree = [];
        arrayFour = [];
        arrayFive = [];
        arraySix = [];
        arraySeven = [];
        arrayEight = [];
        arrayNine = [];
        arrayTen = [];
        arrayEleven = [];
        // Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
        console.log(rows);
        for (let i = 14; i < 26; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            arrayOne.push(parseFloat(row[16]));
            arrayTwo.push(parseFloat(row[24]));
            arrayNine.push(parseFloat(row[28]));
            arrayTen.push(parseFloat(row[31]));
            arrayEleven.push(parseFloat(row[32]));
        }
        // console.log(arrayOne);
        // console.log(arrayTwo);

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

        // console.log(suma1);
        // console.log(suma2);

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

        console.log(rows[1].split(','));

        for (let i = 2; i < 14; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            arrayThree.push(parseFloat(row[2]));
            arrayFour.push(parseFloat(row[5]));
            arraySix.push(parseFloat(row[9]));
            arraySeven.push(parseFloat(row[12]));
            arrayEight.push(parseFloat(row[13]));
        }

        for (let i = 2; i < 26; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            arrayFive.push(parseFloat(row[200]));
        }

        // range.values.forEach(r => {
        //     arrayThree.push(parseFloat(r[2].replace(/,/g, '')));  //ingresos cobrados
        //     arrayFour.push(parseFloat(r[5].replace(/,/g, '')));  //ISR impuestos pagados
        //     arrayFive.push(parseFloat(r[8].replace(/,/g, '')));    //IVA impuestos pagados
        // });

        const suma3 = arrayThree.reduce((anterior, actual) => anterior + actual, 0);
        const suma4 = arrayFour.reduce((anterior, actual) => anterior + actual, 0);
        const suma5 = arrayFive.reduce((anterior, actual) => anterior + actual, 0);

        // console.log(suma3);
        // console.log(suma4);
        // console.log(suma5);

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

        const suma6 = arraySix.reduce((anterior, actual) => anterior + actual, 0);
        const suma7 = arraySeven.reduce((anterior, actual) => anterior + actual, 0);
        const suma8 = arrayEight.reduce((anterior, actual) => anterior + actual, 0);

        const suma9 = arrayNine.reduce((anterior, actual) => anterior + actual, 0);
        const suma10 = arrayTen.reduce((anterior, actual) => anterior + actual, 0);
        const suma11 = arrayEleven.reduce((anterior, actual) => anterior + actual, 0);

        // console.log(suma6);
        // console.log(suma7);
        // console.log(suma8);
        // console.log(suma9);
        // console.log(suma10);
        // console.log(suma11);

        var doughnutChart = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: ['Retenciones ISR', 'ISR', 'Actualizaciones y recargos ISR', 'Retenciones IVA', 'IVA', 'Actualizaciones y recargos IVA'],
                datasets: [{
                    label: 'Dataset 1',
                    data: [suma6, suma7, suma8, suma9, suma10, suma11],
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
    })
    .catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
    });
