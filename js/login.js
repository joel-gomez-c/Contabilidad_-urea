let username = document.getElementById("floatingInput");
let password = document.getElementById("floatingPassword");


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
    console.log(`Username ${username.value}`);
    console.log(`Password ${password.value}`);

    // fetch(url)
    // .then(response => response.text())
    // .then(data => {
    //     // Dividir el archivo CSV en filas
    //     const rows = data.split('\n');
    //     // Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
    //     for (let i = 1; i < rows.length; i++) {
    //     const row = rows[i].split(',');
    //     const nombre = row[0];
    //     const usuario = row[1];
    //     const contraseña = row[2];
    //     const enlace = row[3];
    //     if((username in row) && (password in row)){
    //         console.log(`Nombre: ${nombre}, Usuario: ${usuario}, Contraseña: ${contraseña}, Enlace: ${enlace}`);    
    //     }else{
    //         console.log("Not existing user");
    //     }
    //     // Procesar los datos como desees (por ejemplo, mostrarlos en la consola)
    //     //console.log(`Nombre: ${nombre}, Usuario: ${usuario}, Contraseña: ${contraseña}, Enlace: ${enlace}`);
    //     }
    // })
    // .catch(error => {
    //     console.error('Error al cargar el archivo CSV:', error);
    // });

});

// URL del archivo CSV
const url = '../src/extra/data.csv';

//Función para cargar y procesar el archivo CSV
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Dividir el archivo CSV en filas
    const rows = data.split('\n');
    // Procesar cada fila (excepto la primera, que contiene los nombres de las columnas)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      const nombre = row[0];
      const usuario = row[1];
      const contraseña = row[2];
      const enlace = row[3];
      // Procesar los datos como desees (por ejemplo, mostrarlos en la consola)
      console.log(`Nombre: ${nombre}, Usuario: ${usuario}, Contraseña: ${contraseña}, Enlace: ${enlace}`);
    }
  })
  .catch(error => {
    console.error('Error al cargar el archivo CSV:', error);
  });