let username = document.getElementById("floatingInput");
let password = document.getElementById("floatingPassword");
// URL del archivo CSV
const url = '../src/extra/data.csv';

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
        const enlace = row[3];
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
            window.location.href = "../index.html";
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