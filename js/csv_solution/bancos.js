//let texto1 = document.getElementById("texto1");
let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");
const url = '../../src/data/a_rosas/bancos.csv';
let arrayOne = [129647.08, 382093.92, 305202.20];
let arrayTwo = [89442.40, 566119.79, 49920.00];
let arrayThree = ['Crédito BBVA', 'Débito BBVA', 'Débito NU'];

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

var ctx = document.getElementById('chartOne').getContext('2d');

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
    // localStorage.removeItem("usuario");
    // localStorage.removeItem("contraseña");
    window.location.href = "../../index.html";
});

fetch(url)
    .then(response => response.text())
    .then(data => {
        // Dividir el archivo CSV en filas
        const rows = data.split('\n');
        arrayOne = [];
        arrayTwo = [];
        arrayThree = [];
        // Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
        // console.log(rows)
        for (let i = 6; i < 11; i++) {
            const row = rows[i].split(',');
            //rows.length
            // console.log(row);
            const fila = `<tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        </tr>`;
            tableBody.insertAdjacentHTML("beforeend", fila);
            arrayOne.push(parseFloat(row[2]));
            arrayTwo.push(parseFloat(row[3]));
            arrayThree.push(row[1]);
        }
        
        // console.log(arrayOne);
        // console.log(arrayTwo);
        // console.log(arrayThree);

        var chartOne = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [arrayThree[0], '', arrayThree[1], '', arrayThree[2], ''],
                datasets: [{
                    label: 'Retiros',
                    backgroundColor: 'yellow',  //retiros
                    borderColor: 'yellow',
                    borderWidth: 1,
                    data: [arrayTwo[0], 0, arrayTwo[1], 0, arrayTwo[2]]
                }, {
                    label: 'Depositos',
                    backgroundColor: 'blue',    //depositos
                    borderColor: 'blue',
                    borderWidth: 1,
                    data: [0, arrayOne[0], 0, arrayOne[1], 0, arrayOne[2]]
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

        for (let i = 2; i < (rows.length - 1); i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
        <td>${row[7]}</td>
        <td>${row[8]}</td>
        <td>${row[9]}</td>
        <td>${row[10]}</td>
        <td>${row[11]}</td>
        <td>${row[12]}</td>
        <td>${row[13]}</td>
        <td>${row[14]}</td>
        <td>${row[15]}</td>
        <td>${row[16]}</td>
        <td>${row[17]}</td>
        </tr>`;
            tableBodyTwo.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 2; i < 14; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
        <td>${row[19]}</td>
        <td>${row[20]}</td>
        <td>${row[21]}</td>
        <td>${row[22]}</td>
        <td>${row[23]}</td>
        <td>${row[24]}</td>
        <td>${row[25]}</td>
        <td>${row[26]}</td>
        </tr>`;
            tableBodyThree.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 1; i < 14; i++) {
            const row = rows[i].split(',');
            //rows.length
            console.log(row);
            const fila = `<tr>
        <td>${row[28]}</td>
        <td>${row[29]}</td>
        <td>${row[30]}</td>
        </tr>`;
            tableBodyFour.insertAdjacentHTML("beforeend", fila);
        }
    })
    .catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
    });
