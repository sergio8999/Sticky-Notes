import{Vista, VistaNota1, VistaNota2} from "./clases.js";

var notas = {"listaNotas":[]};  // Crear array vacion JSON
var vista = new Vista();
var vistaNota = new VistaNota1();
var arrastrando = false;
var notaMovimiento,cont;

function main(){
    elegirVista();
    cargarJSON();
    // contador para saber id de etiquetas
    cont = notas.listaNotas.length;
    crearNota();
    enventoMover();

    // Cada 10 segundos obtiene y actualiza el tiempo que lleva creada las notas
    setInterval(obtenerMinutos,10000);
}


function elegirVista(){
    document.getElementById('vista1').addEventListener('click',()=>{
        borrarNotas();
        vista = new Vista();
        vistaNota = new VistaNota1();
        localStorage.setItem("vistaNota",JSON.stringify("vista1"));
        cont = notas.listaNotas.length;
        cambiarEstilo();
        obtenerMinutos();
    });

    document.getElementById('vista2').addEventListener('click',()=>{
        /* divNotas.innerHTML=""; */
        borrarNotas();
        vista = new Vista();
        vistaNota = new VistaNota2();
        localStorage.setItem("vistaNota",JSON.stringify("vista2")); 
        cont = notas.listaNotas.length;
        cambiarEstilo();
        obtenerMinutos();
    });
}

function borrarNotas(){
    let section = document.getElementsByTagName('section');
    for(let i=section.length-1;i>=0;i--){
        section[i].remove();
    }
}

function cambiarEstilo(){
    for(let i=0;i<notas.listaNotas.length;i++){
        vistaNota.dibujarNota(notas.listaNotas[i],i);
        borrarNota(i);
        editarNota(i);
    }
    enventoMover();
}

function enventoMover(){
    let sections = document.querySelectorAll('section');
    sections.forEach(section => section.addEventListener('click',notaPulsada));
    window.addEventListener('mousemove',moverNota);
}

function crearNota(){
    let titulo = document.getElementById('titulo');
    let descripcion = document.getElementById('descripcion');

    document.getElementById('botonEnviar').addEventListener('click',()=>{ 
        let fecha =Date.now();
        notas.listaNotas.push({"titulo":titulo.value,"descripcion":descripcion.value,"fechaMilisegundos":fecha,"fechaDigitos":obtenerFechaCreacion()});
        let nota = notas.listaNotas[notas.listaNotas.length-1];
        vistaNota.dibujarNota(nota,cont);
        document.getElementById('sectionNota'+cont).addEventListener('click',notaPulsada);
        borrarNota(cont);
        editarNota(cont);
        vista.limpiarTexto();
        localStorage.setItem("listaNotas",JSON.stringify(notas.listaNotas)); 
        cont++;
    });
}

function borrarNota(id){
    document.getElementById('divBotones'+id).lastChild.addEventListener('click',()=>{
        notas.listaNotas.splice(id,1);
        vista.borrarNota(id);
        localStorage.setItem("listaNotas",JSON.stringify(notas.listaNotas));
    })
}

function editarNota(id){
    document.getElementById('divBotones'+id).firstChild.addEventListener('click',()=>{
        let titulo = document.getElementById('tituloNota'+id).value;
        let descripcion = document.getElementById('descripcionNota'+id).value;
        notas.listaNotas[id].titulo = titulo;
        notas.listaNotas[id].descripcion = descripcion;
        localStorage.setItem("listaNotas",JSON.stringify(notas.listaNotas));
    });
}

function obtenerMinutos(){
    let minutos;
    for(let i=0;i<notas.listaNotas.length;i++){
        minutos = parseInt((Date.now()-notas.listaNotas[i].fechaMilisegundos)/1000/60);
        vista.dibujarMinutos(i,minutos);
    }
}

function obtenerFechaCreacion(){
    let fecha = new Date();
    return fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
}

function notaPulsada(e){
    if(e.target.localName=="section"){
        arrastrando=!arrastrando;
        notaMovimiento=e.currentTarget;
    }
}
function moverNota(e){
    let contenedorDiv = document.getElementById('divNotas').getBoundingClientRect();
    let sectionNotas = document.querySelector('section');

    if(sectionNotas !=null){
        if(arrastrando){
            if(e.y > contenedorDiv.y && e.x < (contenedorDiv.width-sectionNotas.getBoundingClientRect().width)){
                notaMovimiento.style.left = e.x /* - 20  */+ "px";
                notaMovimiento.style.top = e.y /* - 20 */+ "px";
            }
        }
    }
}

function cargarJSON(){
    let notasJSON = JSON.parse(localStorage.getItem('listaNotas'));
    let estilo = JSON.parse(localStorage.getItem('vistaNota'));

    if(estilo == "vista1")
        vistaNota = new VistaNota1();
    else if(estilo == "vista2"){
        vistaNota = new VistaNota2();
        document.getElementById('vista2').checked= true;
    }

    if(notasJSON != null){
        for(let i=0;i<notasJSON.length;i++){
            notas.listaNotas.push(notasJSON[i]);
            vistaNota.dibujarNota(notasJSON[i],i); 
            borrarNota(i);
            editarNota(i);
        }
        obtenerMinutos();
    }
}


window.addEventListener('load',main);