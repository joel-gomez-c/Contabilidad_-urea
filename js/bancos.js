//let texto1 = document.getElementById("texto1");
let nombre = "";
let enlace = "";
let user_name = document.getElementById("user_name");
let logOut = document.getElementById("logOut");

var ctx = document.getElementById('chartOne').getContext('2d');
var chartOne = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Banco A', '', 'Banco B', '', 'Banco C', ''],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderWidth: 1,
            data: [10, 0, 20, 0, 30]
        }, {
            label: 'Dataset 2',
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            data: [0, 15, 0, 25, 0, 35]
        }]
    },
    options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        },
        indexAxis: 'y',
        responsive: false
    }
});

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("nombre")!=null){
        nombre = String(this.localStorage.getItem("nombre"));
        enlace = String(this.localStorage.getItem("enlace"));

        // let fecha = new Date();
        // let hora = fecha.getHours();
        // console.log(hora);
        // if(hora>=0 && hora<12){
        //     //console.log("Buenos días");
        //     texto1.innerText = `Buenos días ${nombre}`;
        // }else if(hora>=12 && hora<20){
        //     //console.log("Buenas tardes");
        //     texto1.innerText = `Buenas tardes ${nombre}`;
        // }else{
        //     //console.log("Buenas noches");
        //     texto1.innerText = `Buenas noches ${nombre}`;
        // }

        user_name.innerText = `${nombre}`;

    }//if != null

});//window load

logOut.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("nombre");
    localStorage.removeItem("enlace");
    // localStorage.removeItem("usuario");
    // localStorage.removeItem("contraseña");
    window.location.href = "../html/login.html";
});
