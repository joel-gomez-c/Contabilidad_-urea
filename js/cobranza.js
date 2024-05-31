/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// let texto1 = document.getElementById("texto1");
let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");
var ctxOne = document.getElementById('chartOne').getContext('2d');

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

//   document.getElementById('authorize_button').style.visibility = 'hidden';
//   document.getElementById('signout_button').style.visibility = 'hidden';
var chartOne = new Chart(ctxOne, {
    type: 'pie',
    data: {
        labels: ['IVA Suma de IMPUESTOS PAGADOS', 'ISR Suma de INGRESOS COBRADOS', 'ISR Suma de IMPUESTOS PAGADOS'],
        datasets: [{
            label: 'Dataset 1',
            data: [40, 25, 25, 10],
            backgroundColor: [
                'blue',
                'yellow',
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
        labels: ['Ernesto Eduardo Vargas Blanco', 'Público en general', 'Miguel Ángel Jarillo Girón', 'Estebán Emilio Perdome'],
        datasets: [{
            label: 'Total',
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            data: [6960, 18232, 19952, 32480]
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

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("nombre")!=null){
        nombre = String(this.localStorage.getItem("nombre"));
        enlace = String(this.localStorage.getItem("enlace"));

        user_name.innerText = `${nombre}`;

    }//if != null
});

// function iniciarPagina(){
//     if(this.localStorage.getItem("nombre")!=null){
//         nombre = String(this.localStorage.getItem("nombre"));
//         enlace = String(this.localStorage.getItem("enlace"));

//         user_name.innerText = `${nombre}`;

//     }//if != null
// }

logOut.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("nombre");
    localStorage.removeItem("enlace");
    // localStorage.removeItem("usuario");
    // localStorage.removeItem("contraseña");
    window.location.href = "../html/login.html";
});

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
    maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        //document.getElementById('authorize_button').style.visibility = 'visible';
        handleAuthClick();
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        //   document.getElementById('signout_button').style.visibility = 'visible';
        //   document.getElementById('authorize_button').innerText = 'Refresh';
        await listMajors();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

/**
 *  Sign out the user upon button click.
 */
//   function handleSignoutClick() {
//     const token = gapi.client.getToken();
//     if (token !== null) {
//       google.accounts.oauth2.revoke(token.access_token);
//       gapi.client.setToken('');
//       document.getElementById('content').innerText = '';
//       document.getElementById('authorize_button').innerText = 'Authorize';
//       document.getElementById('signout_button').style.visibility = 'hidden';
//     }
//   }

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
            range: 'Cobranza!B3:G',
        });
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        document.getElementById('content').innerText = 'No values found.';
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
            <td>${rowData[4]}</td>
            <td>${rowData[5]}</td>
            </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
        }
    });
}