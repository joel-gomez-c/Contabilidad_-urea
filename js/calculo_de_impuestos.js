let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");

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
    window.location.href = "../index.html";
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
          }, // defined later
    });
    gisInited = true;
    checkToken();
    //maybeEnableButtons();
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
            range: 'Calculo impuestos 2024!B4:N19',
        });
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
            <td>${r[11]}</td>
            <td>${r[12]}</td>
            </tr>`;
            tableBody.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
}

async function listMajorsTwo() {
    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: enlace,
            range: 'Calculo impuestos 2024!B22:N49',
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
            <td>${r[11]}</td>
            <td>${r[12]}</td>
            </tr>`;
            tableBodyTwo.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        document.getElementById('contentTwo').innerText = err.message;
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
