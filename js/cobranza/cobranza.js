// Get the table body element
const tableBody = document.getElementById('tableOne').getElementsByTagName('tbody')[0];

// Clear any existing rows
tableBody.innerHTML = '';

//   document.getElementById('authorize_button').style.visibility = 'hidden';
//   document.getElementById('signout_button').style.visibility = 'hidden';

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

function createFila(turno) {
    console.log(turno.length);
    const row = `<tr>
            <td>${turno[0]}</td>
            <td>${turno[1]}</td>
            <td>${turno[2]}</td>
            <td>${turno[3]}</td>
            <td>${turno[4]}</td>
            <td>${turno[5]}</td>
            </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
}

function actualizarTabla() {
    //turnosContainer.innerHTML = "";
    console.log("actualizarTabla");
    arrayFour.forEach((turno) => {
        createFila(turno);
        console.log(turno);
    })
}

//let backgroundColors = generateRandomColors(arrayOne.length);

function getChartOne(){
    var ctxOne = document.getElementById('chartOne').getContext('2d');
    var chartOne = new Chart(ctxOne, {
        type: 'pie',
        data: {
            labels: arrayThree.slice(0, arrayThree.length - 1),
            datasets: [{
                label: 'Dataset 1',
                data: arrayOne.slice(0, arrayOne.length - 1),
                backgroundColor: generateRandomColors(arrayOne.length)
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
}

function getChartTwo(){
    var ctxTwo = document.getElementById('chartTwo').getContext('2d');
    var chartTwo = new Chart(ctxTwo, {
        type: 'bar',
        data: {
            labels: arrayThree.slice(0, arrayThree.length - 1),
            datasets: [{
                label: 'Total',
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                data: arrayTwo.slice(0, arrayTwo.length - 1)
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
}
