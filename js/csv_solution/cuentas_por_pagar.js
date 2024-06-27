let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");
//const url = '../../src/data/a_rosas/cuentas_por_pagar.csv';
let arrayOne = [21272.16, 16508.16, 1600.00, 1328.00, 1120.00, 1103.45, 593.10, 43524.87];
let arrayTwo = ['ESTEBAN EMILIO PERDOME', 'DRIDCO MEXICO', 'ORIENTAL FILMS MEXICO', 'EN VIERNES PRODUCEN', 'MEDIA AND DESING LAB', 'ERNESTO EMILIO ORDOÑEZ GALLARDO', 'PUBLICO EN GENERAL', 'Total general'];

// Get the table body element
const tableBody = document.getElementById('tableOne').getElementsByTagName('tbody')[0];
// Clear any existing rows
tableBody.innerHTML = '';

var ctxOne = document.getElementById('chartOne').getContext('2d');

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("nombre")!=null){
        nombre = String(this.localStorage.getItem("nombre"));
        enlace = String(this.localStorage.getItem("enlace"));

        user_name.innerText = `${nombre}`;

    }//if != null

});//window load

logOut.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("nombre");
    localStorage.removeItem("enlace");
    window.location.href = "../../index.html";
});

// Función para generar un color hexadecimal aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para generar un arreglo de colores aleatorios basado en el tamaño del arreglo de datos
function generateRandomColors(dataLength) {
    const colors = [];
    for (let i = 0; i < dataLength; i++) {
        colors.push(getRandomColor());
    }
    return colors;
}

fetch(String(this.localStorage.getItem("enlace")) + 'cuentas_por_pagar.csv')
    .then(response => response.text())
    .then(data => {
        // Dividir el archivo CSV en filas
        const rows = data.split('\n');
        arrayOne = [];
        arrayTwo = [];
        console.log(rows)
        //Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
        for (let i = 1; i < (rows.length-1); i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
            <td>${row[4]}</td>
            <td>${row[5]}</td>
            <td>${row[6]}</td>
            <td>${row[7]}</td>
            </tr>`;
            tableBody.insertAdjacentHTML("beforeend", fila);
            arrayOne.push(parseFloat(row[1]));
            arrayTwo.push(row[0]);
        }

        console.log(arrayOne);
        console.log(arrayTwo);

        let backgroundColors = generateRandomColors(arrayOne.length);
        
        var chartOne = new Chart(ctxOne, {
            type: 'pie',
            data: {
                labels: arrayTwo.slice(0, arrayTwo.length - 1),
                datasets: [{
                    label: 'Dataset 1',
                    data: arrayOne.slice(0, arrayOne.length - 1),
                    backgroundColor: backgroundColors
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
    })
    .catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
    });