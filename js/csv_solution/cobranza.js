// let texto1 = document.getElementById("texto1");
let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");

let arrayOne = [21272.16,16508.16,1600.00,1328.00,1120.00,1103.45,593.10,43524.87];
let arrayTwo = [154223.16,107388.99,10408.33,8638.91,7285.83,8000.00,4300.00,300245.22];
let arrayThree = ['ESTEBAN EMILIO PERDOME','DRIDCO MEXICO','ORIENTAL FILMS MEXICO','EN VIERNES PRODUCEN','MEDIA AND DESING LAB','ERNESTO EMILIO ORDOÑEZ GALLARDO','PUBLICO EN GENERAL','Total general'];

// Get the table body element
const tableBody = document.getElementById('tableOne').getElementsByTagName('tbody')[0];
// Clear any existing rows
tableBody.innerHTML = '';

window.addEventListener("load", function (event) {
    event.preventDefault();
    if (this.localStorage.getItem("nombre") != null) {
        nombre = String(this.localStorage.getItem("nombre"));
        enlace = String(this.localStorage.getItem("enlace"));

        user_name.innerText = `${nombre}`;

    }//if != null
});

logOut.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("nombre");
    localStorage.removeItem("enlace");
    // localStorage.removeItem("usuario");
    // localStorage.removeItem("contraseña");
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

range.values.forEach(r => {
    const hasValues = r.some(cell => cell !== undefined && cell !== null && cell !== '');
    if (hasValues) {
        const rowData = r.map(cell => cell !== undefined ? cell : '');
        console.log(rowData.length);
        const row = `<tr>
        <td>${rowData[0]}</td>
        <td>${rowData[1]}</td>
        <td>${rowData[2]}</td>
        <td>${rowData[3]}</td>
        <td>${rowData[4]}</td>
        <td>${rowData[5]}</td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
        arrayOne.push(parseFloat(rowData[4].replace(/,/g, '')));
        arrayTwo.push(parseFloat(rowData[5].replace(/,/g, '')));
        arrayThree.push(rowData[0]);
        //console.log(rowData);
    }
    //console.log(rowData);
});

let backgroundColors = generateRandomColors(arrayOne.length);

var ctxOne = document.getElementById('chartOne').getContext('2d');
var chartOne = new Chart(ctxOne, {
    type: 'pie',
    data: {
        labels: arrayThree.slice(0, arrayThree.length - 1),
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
