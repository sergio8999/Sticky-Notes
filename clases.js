class Vista{
    constructor(){
        this.arrastrando = false;
        this.notaMovimiento;
    }

    borrarNota(id){
        document.getElementById('sectionNota'+id).remove();
    }

    dibujarMinutos(id,minutos){
        document.getElementById("parrafo"+id).textContent = "Creada hace "+ minutos + " minutos";
    }

    limpiarTexto(){
        let titulo = document.getElementById('titulo');
        let descripcion = document.getElementById('descripcion');
        titulo.value = "";
        descripcion.value = "";
    }

}
class VistaNota1{
    constructor(){
        this.contenedorDiv;
        this.divBotones;
        this.iconoBorrar;
        this.iconoEditar;
        this.section;
        this.labelTitulo;
        this.input;
        this.divTextArea;
        this.labelDescripcion;
        this.textArea;
        this.parrafo;
        this.ultimaPosicionX = 5;
        this.ultimaPosicionY = 15;
    }

    dibujarNota(nota,id){
        document.body.style.backgroundImage="url(corcho.jpg)";
        this.contenedorDiv = document.getElementById('divNotas');
        if(this.ultimaPosicionX >= 90){
            this.ultimaPosicionX = 5;
            this.ultimaPosicionY += 18;
        }
    
        // Crear id    
        this.divBotones = document.createElement('div');
        this.divBotones.id = "divBotones"+id;
        this.iconoBorrar = document.createElement("span");
        this.iconoBorrar.classList.add("material-icons");
        this. iconoBorrar.textContent = "delete";
        this.iconoEditar = document.createElement("span");
        this.iconoEditar.classList.add("material-icons");
        this.iconoEditar.textContent = "done";
    
        this.section = document.createElement('section');
        this.section.id = "sectionNota"+id;
        this.section.style.left = this.ultimaPosicionX + "%";
        this.section.style.top = this.ultimaPosicionY + "vh";
        this.labelTitulo = document.createElement('label');
        this.labelTitulo.textContent = "Titulo:";
        this.labelTitulo.setAttribute('for','tituloNota'+id);
    
        this.input = document.createElement('input');
        this.input.value = nota.titulo;
        this.input.id = "tituloNota"+id;
    
        this.divTextArea = document.createElement('div');
        this.divTextArea.style.display = "flex";
        this.divTextArea.style.flexDirection = "column";
    
        this.labelDescripcion = document.createElement('label');
        this.labelDescripcion.textContent = "Descripcion:";
        this.labelDescripcion.setAttribute('for','descripcionNota'+id);
    
        this.textArea = document.createElement('textarea');
        this.textArea.textContent = nota.descripcion;
        this.textArea.id = "descripcionNota"+id;
    
        this.parrafo = document.createElement('p');
        this.parrafo.textContent="Creada hace 0 minutos";
        this.parrafo.id = "parrafo"+id;
    
        //Añadir a div
        this.contenedorDiv.appendChild(this.section);
        this.section.appendChild(this.divBotones);
        this.divBotones.appendChild(this.iconoEditar);
        this.divBotones.appendChild(this.iconoBorrar);
        this.section.appendChild(this.labelTitulo);
        this.section.appendChild(this.input);
        this.section.appendChild(this.divTextArea);
        this.divTextArea.appendChild(this.labelDescripcion);
        this.divTextArea.appendChild(this.textArea);
        this.section.appendChild(this.parrafo);
    
        this.ultimaPosicionX+=17;
    }
}

class VistaNota2{
    constructor(){
        this.contenedorDiv;
        this.divBotones;
        this.iconoBorrar;
        this.iconoEditar;
        this.section;
        this.parrafoFecha;
        this.input;
        this.divTextArea;
        this.textArea;
        this.parrafo;
        this.ultimaPosicionX = 5;
        this.ultimaPosicionY = 15;
    }

    dibujarNota(nota,id){
        document.body.style.backgroundImage="url(pizarra.jpg)";
        this.contenedorDiv = document.getElementById('divNotas');
        if(this.ultimaPosicionX >= 90){
            this.ultimaPosicionX = 5;
            this.ultimaPosicionY += 18;
        }

        // Crear id    
        this.divBotones = document.createElement('div');
        this.divBotones.id = "divBotones"+id;
        this.iconoBorrar = document.createElement("span");
        this.iconoBorrar.classList.add("material-icons");
        this.iconoBorrar.textContent = "delete";
        this.iconoEditar = document.createElement("span");
        this.iconoEditar.classList.add("material-icons");
        this.iconoEditar.textContent = "done";

        this.section = document.createElement('section');
        this.section.id = "sectionNota"+id;
        this.section.style.left = this.ultimaPosicionX + "%";
        this.section.style.top = this.ultimaPosicionY + "vh";
        this.section.style.backgroundColor = "orange";

        this.parrafoFecha = document.createElement('p');
        this.parrafoFecha.style.width = "30%";
        this.parrafoFecha.textContent = nota.fechaDigitos;

        this.input = document.createElement('input');
        this.input.value = nota.titulo;
        this.input.id = "tituloNota"+id;
        this.input.style.backgroundColor = "orange";

        this.divTextArea = document.createElement('div');
        this.divTextArea.style.display = "flex";
        this.divTextArea.style.flexDirection = "column";



        this.textArea = document.createElement('textarea');
        this.textArea.textContent = nota.descripcion;
        this.textArea.id = "descripcionNota"+id;
        this.textArea.style.backgroundColor = "orange";

        this.parrafo = document.createElement('p');
        this.parrafo.textContent="Creada hace 0 minutos";
        this.parrafo.id = "parrafo"+id;

        //Añadir a div
        this.contenedorDiv.appendChild(this.section);
        this.section.appendChild(this.divBotones);
        this.divBotones.appendChild(this.iconoEditar);
        this.divBotones.appendChild(this.iconoBorrar);
        this.section.appendChild(this.parrafoFecha);
        this.section.appendChild(this.input);
        this.section.appendChild(this.divTextArea);

        this.divTextArea.appendChild(this.textArea);
        this.section.appendChild(this.parrafo);

        this.ultimaPosicionX+=17;
    }
}

export{Vista,VistaNota1,VistaNota2};