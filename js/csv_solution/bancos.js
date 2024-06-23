//let texto1 = document.getElementById("texto1");
let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");
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

// Iterate over each row in the range.values array
range.values.forEach(r => {
    arrayOne.push(parseFloat(r[2].replace(/,/g, '')));  //Depositos
    arrayTwo.push(parseFloat(r[3].replace(/,/g, '')));  //Retiros
    arrayThree.push(r[1]);  //Etiquetas de fila
    let row = `<tr>
    <td>${r[0]}</td>
    <td>${r[1]}</td>
    <td>${r[2]}</td>
    <td>${r[3]}</td>
    <td>${r[4]}</td>
    </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
});

var ctx = document.getElementById('chartOne').getContext('2d');
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

range.values.forEach(r => {
    let row = `<tr>
    <td>${r[0]}</td>
    <td>${r[1]}</td>
    <td>${r[2]}</td>
    <td>${r[3]}</td>
    <td>${r[4]}</td>
    <td>${r[5]}</td>
    <td>${r[6]}</td>
    <td>${r[7]}</td>
    <td>${r[8]}</td>
    <td>${r[9]}</td>
    <td>${r[10]}</td>
    </tr>`;
    tableBodyTwo.insertAdjacentHTML("beforeend", row);
});

range.values.forEach(r => {
    let row = `<tr>
    <td>${r[0]}</td>
    <td>${r[1]}</td>
    <td>${r[2]}</td>
    <td>${r[3]}</td>
    <td>${r[4]}</td>
    <td>${r[5]}</td>
    <td>${r[6]}</td>
    <td>${r[7]}</td>
    </tr>`;
    tableBodyThree.insertAdjacentHTML("beforeend", row);
});

range.values.forEach(r => {
    let row = `<tr>
    <td>${r[0]}</td>
    <td>${r[1]}</td>
    <td>${r[2]}</td>
    </tr>`;
    tableBodyFour.insertAdjacentHTML("beforeend", row);
});

