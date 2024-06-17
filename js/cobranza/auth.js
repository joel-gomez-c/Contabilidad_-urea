/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

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
            await listMajors();//primero la función de sheets.js
            // actualizarTabla();
            // getChartOne();
            // getChartTwo();//después la función de cobranza.js
          }, // defined later
    });
    gisInited = true;
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
    checkToken();
}

function checkToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
        gapi.client.setToken({ access_token: token });        //OJO
        listMajors();
        // actualizarTabla();
        // getChartOne();
        // getChartTwo();//después la función de cobranza.js
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
    // const token = gapi.client.getToken();
    // if (token !== null) {
    //     google.accounts.oauth2.revoke(token.access_token);
    //     gapi.client.setToken('');
    //     document.getElementById('content').innerText = '';
    //     document.getElementById('authorize_button').innerText = 'Authorize';
    //     document.getElementById('signout_button').style.visibility = 'hidden';
    // }
}
