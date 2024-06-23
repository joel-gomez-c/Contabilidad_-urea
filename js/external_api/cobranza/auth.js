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
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
    console.log("gapi was loaded");
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
    console.log("initializeGapiClient()");
    checkToken();
}

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
            //await listMajors();
        },
    });
    gisInited = true;
    console.log("gisLoaded()");
    checkToken();
}

function checkToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
        gapi.client.setToken({ access_token: token });
        //listMajors();
        console.log("go to listMajors()");
    } else if (gapiInited && gisInited) {
        console.log("go to handleAuthClick()");
        handleAuthClick();
    }
    console.log("checkToken()");
}

function storeToken(token) {
    localStorage.setItem('access_token', token);
    console.log("Token was stored");
}

function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        storeToken(resp.access_token);
        console.log("await listMajors()");
        //await listMajors();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
    console.log("handleAuthClick()");
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