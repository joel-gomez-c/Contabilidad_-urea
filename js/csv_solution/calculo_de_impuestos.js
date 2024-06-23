let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");

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
    window.location.href = "../../index.html";
});

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
