let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");
const url = '../../src/data/a_rosas/calculo_de_impuestos.csv';

// Get the table body element
const tableBody = document.getElementById('tableOne').getElementsByTagName('tbody')[0];
// Clear any existing rows
tableBody.innerHTML = '';

const tableBodyTwo = document.getElementById('tableTwo').getElementsByTagName('tbody')[0];
tableBodyTwo.innerHTML = '';

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
        console.log(rows)
        //Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
        for (let i = 1; i < 17; i++) {
            const row = rows[i].split(',');
            //rows.length
            console.log(row);
            const fila = `<tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
        <td>${row[6]}</td>
        <td>${row[7]}</td>
        <td>${row[8]}</td>
        <td>${row[9]}</td>
        <td>${row[10]}</td>
        <td>${row[11]}</td>
        <td>${row[12]}</td>
        </tr>`;
            tableBody.insertAdjacentHTML("beforeend", fila);
        }

        for (let i = 19; i < (rows.length-1); i++) {
            const row = rows[i].split(',');
            //rows.length
            console.log(row);
            const fila = `<tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
            <td>${row[4]}</td>
            <td>${row[5]}</td>
            <td>${row[6]}</td>
            <td>${row[7]}</td>
            <td>${row[8]}</td>
            <td>${row[9]}</td>
            <td>${row[10]}</td>
            <td>${row[11]}</td>
            <td>${row[12]}</td>
            </tr>`;
            tableBodyTwo.insertAdjacentHTML("beforeend", fila);
        }
        
    })
    .catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
    });
