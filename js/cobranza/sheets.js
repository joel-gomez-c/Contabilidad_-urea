let arrayOne = [];
let arrayTwo = [];
let arrayThree = [];
let arrayFour = [];

async function listMajors() {
    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: String(this.localStorage.getItem("enlace")), //OJO
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
            arrayOne.push(parseFloat(rowData[4].replace(/,/g, '')));
            arrayTwo.push(parseFloat(rowData[5].replace(/,/g, '')));
            arrayThree.push(rowData[0]);
            arrayFour.push(rowData);
        }
    });
    console.log(arrayThree);
    console.log(arrayOne);
    console.log(arrayTwo);

    actualizarTabla();
    getChartOne();
    getChartTwo();

}