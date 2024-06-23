let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");

// Get the table body element
const tableBody = document.getElementById('tableOne').getElementsByTagName('tbody')[0];
// Clear any existing rows
tableBody.innerHTML = '';

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
    window.location.href = "../../index.html";
});

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
    <td>${rowData[6]}</td>
    <td>${rowData[7]}</td>
    </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
    }
});
