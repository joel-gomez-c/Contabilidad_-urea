let texto1 = document.getElementById("texto1");
let nombre = "";
let enlace = "";

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("nombre")!=null){
        nombre = String(this.localStorage.getItem("nombre"));
        enlace = String(this.localStorage.getItem("enlace"));

        let fecha = new Date();
        let hora = fecha.getHours();
        console.log(hora);
        if(hora>=0 && hora<12){
            //console.log("Buenos días");
            texto1.innerText = `Buenos días ${nombre}`;
        }else if(hora>=12 && hora<20){
            //console.log("Buenas tardes");
            texto1.innerText = `Buenas tardes ${nombre}`;
        }else{
            //console.log("Buenas noches");
            texto1.innerText = `Buenas noches ${nombre}`;
        }
        
    }//if != null

});//window load