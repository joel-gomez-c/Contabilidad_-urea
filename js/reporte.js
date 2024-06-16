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

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '932482928952-9mhu5qq6st6ta27rv2uo42df1kd5vati.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDkIub3BjxGpSGg6naz2fKB7uVowkW2INA';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("gapi").addEventListener("load", gapiLoaded);
document.getElementById("gis").addEventListener("load", gisLoaded);

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

window.addEventListener("load", function (event) {
    event.preventDefault();
    if (this.localStorage.getItem("nombre") != null) {
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

logOut.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("nombre");
    localStorage.removeItem("enlace");
    // localStorage.removeItem("usuario");
    // localStorage.removeItem("contraseña");
    window.location.href = "../html/login.html";
    handleSignoutClick();
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

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (response) => {
            if (response.error !== undefined) {
              throw (response);
            }
            storeToken(response.access_token);
            await listMajors();
            await listMajorsTwo();
            await listMajorsThree();
            await listMajorsFour();
            await listMajorsFive();
            await listMajorsSix();
          }, // defined later
    });
    gisInited = true;
    //maybeEnableButtons();
    checkToken();
}

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    //maybeEnableButtons();
    checkToken();
}

function checkToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      gapi.client.setToken({ access_token: token });        //OJO
      listMajors();
      listMajorsTwo();
      listMajorsThree();
      listMajorsFour();
      listMajorsFive();
      listMajorsSix();
    } else if (gapiInited && gisInited) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    }
  }

function storeToken(token) {
    localStorage.setItem('access_token', token);
    //document.getElementById('signout_button').style.visibility = 'visible';
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    localStorage.removeItem('access_token');
    google.accounts.oauth2.revoke(gapi.client.getToken().access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    //document.getElementById('signout_button').style.visibility = 'hidden';
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
async function listMajors() {
    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: enlace,
            range: 'REPORTE!B26:D',
        });
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            document.getElementById('contentOne').innerText = 'No values found.';
            return;
        }
        console.log(range.values);
        // console.log(`Name: ${range.values[10][0]}, Major: ${range.values[10][4]}`);
        // Flatten to string to display
        // const output = range.values.reduce(
        //     (str, row) => `${str}${row[0]}, ${row[4]}\n`,
        //     'Name, Major:\n');
        // document.getElementById('content').innerText = output;

        // Iterate over each row in the range.values array
        range.values.forEach(r => {
            const hasValues = r.some(cell => cell !== undefined && cell !== null && cell !== '');
            if (hasValues) {
                const rowData = r.map(cell => cell !== undefined ? cell : '');
                const row = `<tr>
            <td>${rowData[0]}</td>
            <td>${rowData[1]}</td>
            <td>${rowData[2]}</td>
            </tr>`;
                tableBody.insertAdjacentHTML("beforeend", row);
            }
        });
    } catch (err) {
        document.getElementById('contentOne').innerText = err.message;
        return;
    }
}

async function listMajorsTwo() {
    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: enlace,
            range: 'REPORTE!F26:I',
        });
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            document.getElementById('contentTwo').innerText = 'No values found.';
            return;
        }
        console.log(range.values);
        // console.log(`Name: ${range.values[10][0]}, Major: ${range.values[10][4]}`);
        // Flatten to string to display
        // const output = range.values.reduce(
        //     (str, row) => `${str}${row[0]}, ${row[4]}\n`,
        //     'Name, Major:\n');
        // document.getElementById('content').innerText = output;

        // Iterate over each row in the range.values array
        range.values.forEach(r => {
            const hasValues = r.some(cell => cell !== undefined && cell !== null && cell !== '');
            if (hasValues) {
                const rowData = r.map(cell => cell !== undefined ? cell : '');
                const row = `<tr>
            <td>${rowData[0]}</td>
            <td>${rowData[1]}</td>
            <td>${rowData[2]}</td>
            <td>${rowData[3]}</td>
            </tr>`;
                tableBodyTwo.insertAdjacentHTML("beforeend", row);
            }
        });
    } catch (err) {
        document.getElementById('contentTwo').innerText = err.message;
        return;
    }
}

async function listMajorsThree() {
    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: enlace,
            range: 'REPORTE!B61:C68',
        });
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            document.getElementById('contentThree').innerText = 'No values found.';
            return;
        }
        console.log(range.values);

        // Iterate over each row in the range.values array
        range.values.forEach(r => {
            let row = `<tr>
            <td>${r[0]}</td>
            <td>${r[1]}</td>
            </tr>`;
            tableBodyThree.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        document.getElementById('contentThree').innerText = err.message;
        return;
    }
}

async function listMajorsFour() {
    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: enlace,
            range: 'REPORTE!F76:G86',
        });
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            document.getElementById('contentFour').innerText = 'No values found.';
            return;
        }
        console.log(range.values);

        // Iterate over each row in the range.values array
        range.values.forEach(r => {
            let row = `<tr>
            <td>${r[0]}</td>
            <td>${r[1]}</td>
            </tr>`;
            tableBodyFour.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        document.getElementById('contentFour').innerText = err.message;
        return;
    }
}

async function listMajorsFive() {
    let response;
    let arrayOne = [];
    let arrayTwo = [];
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: enlace,
            range: 'DATOS!Q15:AI26',
        });
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            document.getElementById('contentFive').innerText = 'No values found.';
            return;
        }
        // console.log(range.values);

        // Iterate over each row in the range.values array
        range.values.forEach(r => {
            arrayOne.push(parseFloat(r[1].replace(/,/g, '')));
            arrayTwo.push(parseFloat(r[9].replace(/,/g, '')));
        });
        console.log(arrayOne);
        console.log(arrayTwo);

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

        console.log(suma1);
        console.log(suma2);

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
    } catch (err) {
        document.getElementById('contentFive').innerText = err.message;
        return;
    }
}

async function listMajorsSix() {
    let response;
    let arrayOne=[];
    let arrayTwo=[];
    let arrayThree=[];
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: enlace,
            range: 'DATOS!B3:P14',
        });
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            document.getElementById('contentSix').innerText = 'No values found.';
            return;
        }
        // Iterate over each row in the range.values array
        range.values.forEach(r => {
            arrayOne.push(parseFloat(r[2].replace(/,/g, '')));  //ingresos cobrados
            arrayTwo.push(parseFloat(r[5].replace(/,/g, '')));  //ISR impuestos pagados
            arrayThree.push(parseFloat(r[8].replace(/,/g, '')));    //IVA impuestos pagados
        });
        console.log(arrayOne);
        console.log(arrayTwo);
        console.log(arrayThree);

        const suma1 = arrayOne.reduce((anterior, actual) => anterior + actual, 0);
        const suma2 = arrayTwo.reduce((anterior, actual) => anterior + actual, 0);
        const suma3 = arrayThree.reduce((anterior, actual) => anterior + actual, 0);

        console.log(suma1);
        console.log(suma2);
        console.log(suma3);

        var ctxPie = document.getElementById('pieChart').getContext('2d');
        var pieChart = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['IVA Suma de IMPUESTOS PAGADOS', 'ISR Suma de INGRESOS COBRADOS', 'ISR Suma de IMPUESTOS PAGADOS'],
                datasets: [{
                    label: 'Dataset 1',
                    data: [suma3, suma1, suma2],
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
    } catch (err) {
        document.getElementById('contentSix').innerText = err.message;
        return;
    }
}

/**
 * Enables user interaction after all libraries are loaded.
 */
// function maybeEnableButtons() {
//     if (gapiInited && gisInited) {
//         //document.getElementById('authorize_button').style.visibility = 'visible';
//         handleAuthClick();
//     }
// }

/**
 *  Sign in the user upon button click.
 */
// function handleAuthClick() {
//     tokenClient.callback = async (resp) => {
//         if (resp.error !== undefined) {
//             throw (resp);
//         }
//         //   document.getElementById('signout_button').style.visibility = 'visible';
//         //   document.getElementById('authorize_button').innerText = 'Refresh';
//         await listMajors();
//         await listMajorsTwo();
//         await listMajorsThree();
//         await listMajorsFour();
//         await listMajorsFive();
//         await listMajorsSix();
//     };

//     if (gapi.client.getToken() === null) {
//         // Prompt the user to select a Google Account and ask for consent to share their data
//         // when establishing a new session.
//         tokenClient.requestAccessToken({ prompt: 'consent' });
//     } else {
//         // Skip display of account chooser and consent dialog for an existing session.
//         tokenClient.requestAccessToken({ prompt: '' });
//     }
// }
