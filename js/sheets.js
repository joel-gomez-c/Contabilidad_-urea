const hoja = "cobranza";
let turnos;

async function getTurnos() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja + "!B:G",
    });
  } catch (err) {
    document.getElementById("tableOne").innerText = err.message;
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById("tableOne").innerText = "No values found.";
    return;
  }

  turnos = [];
  range.values.forEach((fila) => {
    if (isNaN(parseFloat(fila[1])) || fila[5] !== undefined) return;
    const nuevoTurno = {
      etiqueta: fila[0],
      subtotal: fila[1],
      isrretenido: fila[2],
      ivaretenido: fila[3],
      ivatrasladado16: fila[4],
      total: fila[5]
    };
    turnos.push(nuevoTurno);
  });
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
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
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
  // Flatten to string to display
  const output = range.values.reduce(
      (str, row) => `${str}${row[0]}, ${row[4]}\n`,
      'Name, Major:\n');
  document.getElementById('content').innerText = output;
}

// async function editTurno(id, contenido) {
//   const update = [
//     contenido.id,
//     contenido.cliente,
//     contenido.email,
//     contenido.modelo,
//     contenido.problema,
//     new Date().toISOString(),
//     contenido.comentario,
//   ]
//   const filaAEditar = parseInt(id)+1;
//   response = await gapi.client.sheets.spreadsheets.values.update({
//     spreadsheetId: SPREADSHEET,
//     range: `${hoja}!A${filaAEditar}:G${filaAEditar}`,
//     values: [update],
//     valueInputOption:"USER_ENTERED"
//   });
//   return response;
// }
