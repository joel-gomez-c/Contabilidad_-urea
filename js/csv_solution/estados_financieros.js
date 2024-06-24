//let texto1 = document.getElementById("texto1");
let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");
const url = '../../src/data/a_rosas/estados_financieros.csv';

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

fetch(url)
    .then(response => response.text())
    .then(data => {
        // Dividir el archivo CSV en filas
        const rows = data.split('\n');
        console.log(rows)
        //Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
        for (let i = 1; i < 46; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        </tr>`;
            tableBody.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 1; i < 45; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
        </tr>`;
            tableBodyTwo.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 1; i < 49; i++) {
            const row = rows[i].split(',');
            //rows.length
            //console.log(row);
            const fila = `<tr>
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
            <td>${row[18]}</td>
            <td>${row[19]}</td>
            <td>${row[20]}</td>
            <td>${row[21]}</td>
            <td>${row[22]}</td>
            </tr>`;
            tableBodyThree.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 1; i < 25; i++) {
            const row = rows[i].split(',');
            //rows.length
            console.log(row);
            const fila = `<tr>
            <td>${row[25]}</td>
            <td>${row[26]}</td>
            <td>${row[27]}</td>
            <td>${row[28]}</td>
            </tr>`;
            tableBodyFour.insertAdjacentHTML("beforeend", fila);
        }

    })
    .catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
    });
