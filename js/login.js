let username = document.getElementById("floatingInput");
let password = document.getElementById("floatingPassword");
// URL del archivo CSV
const url = '../src/extra/data.csv';

// TODO(developer): Set to client ID and API key from the Developer Console
//const CLIENT_ID = '932482928952-9mhu5qq6st6ta27rv2uo42df1kd5vati.apps.googleusercontent.com';
//const API_KEY = 'AIzaSyDkIub3BjxGpSGg6naz2fKB7uVowkW2INA';

// Discovery doc URL for APIs used by the quickstart
//const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
//const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// let tokenClient;
// let gapiInited = false;
// let gisInited = false;

// document.getElementById("gapi").addEventListener("load", gapiLoaded);
// document.getElementById("gis").addEventListener("load", gisLoaded);

/**
 * Callback after api.js is loaded.
 */
// function gapiLoaded() {
//     gapi.load('client', initializeGapiClient);
// }

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
// async function initializeGapiClient() {
//     await gapi.client.init({
//         apiKey: API_KEY,
//         discoveryDocs: [DISCOVERY_DOC],
//     });
//     gapiInited = true;
//     //maybeEnableButtons();
//     checkToken();
// }

/**
 * Callback after Google Identity Services are loaded.
 */
// function gisLoaded() {
//     tokenClient = google.accounts.oauth2.initTokenClient({
//         client_id: CLIENT_ID,
//         scope: SCOPES,
//         callback: '',
//         });
//         gisInited = true;
//         checkToken();
// }

// function checkToken() {
//     if (gapiInited && gisInited) {
//         console.log("Ready to use");
//         handleAuthClick();
//     }else{
//         console.log("Please refresh the browser.");
//     }
//   }

// function storeToken(token) {
//     localStorage.setItem('access_token', token);
// }

/**
 *  Sign in the user upon button click.
 */
// function handleAuthClick() {
//     tokenClient.callback = async (resp) => {
//       if (resp.error !== undefined) {
//         throw (resp);
//       }
//       storeToken(resp.access_token);
//     };
  
//     if (gapi.client.getToken() === null) {
      
//       tokenClient.requestAccessToken({ prompt: 'consent' });
//     } else {
      
//       tokenClient.requestAccessToken({ prompt: '' });
//     }
//   }

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
    console.log(`Username ${username.value}`);
    console.log(`Password ${password.value}`);

    fetch(url)
    .then(response => response.text())
    .then(data => {
        // Dividir el archivo CSV en filas
        const rows = data.split('\n');
        let cardExists = false;
        // Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
        for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        const nombre = row[0];
        const usuario = row[1];
        const contraseña = row[2];
        const enlace = row[3].trim();
        if((username.value == usuario) && (password.value == contraseña)){
            // console.log(`Nombre: ${nombre}, Usuario: ${usuario}, Contraseña: ${contraseña}, Enlace: ${enlace}`);
            localStorage.setItem("nombre", nombre);
            //localStorage.setItem("usuario", usuario);
            //localStorage.setItem("contraseña", contraseña);
            localStorage.setItem("enlace", enlace);
            cardExists = true;
            break;
        }
        // }else{
        //     window.alert("No existe el usuario, o la contraseña es incorrecta");
        //     console.log("Not existing user");
        // }
        // Procesar los datos como desees (por ejemplo, mostrarlos en la consola)
        //console.log(`Nombre: ${nombre}, Usuario: ${usuario}, Contraseña: ${contraseña}, Enlace: ${enlace}`);
        }

        if(cardExists){
            console.log("Acceso permitido!!! :D");
            // window.alert("Acceso permitido");
            //handleAuthClick();
            window.location.href = "../html/inicio.html";
        }else{
            window.alert("No existe el usuario, o la contraseña es incorrecta");
            console.log("Not existing user");
        }
    })
    .catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
    });

});

//Función para cargar y procesar el archivo CSV
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