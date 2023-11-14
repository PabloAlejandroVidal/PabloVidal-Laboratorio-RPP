import {Monstruo} from "./monstruo.js";
import {crearCards} from "./monstruoCard.js";
import {crearLineas, crearLinea} from "./lineaTabla.js";

const defensas = ["pocion", "crucifijo", "estaca", "plata"];
const miedoMin = 100;
const miedoMax = 500;
const tipos = ["esqueleto", "zombie", "vampiro", "fantasma", "bruja", "hombre-lobo"];

const btnAgregar = document.getElementById("btn-agregar");
const btnGuardar = document.getElementById("btn-guardar");
const btnEliminar = document.getElementById("btn-eliminar");
const btnCancelar = document.getElementById("btn-cancelar");
const form = document.getElementById("form");

const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const overlay = document.getElementById("overlay");
async function mostrarSpinner () {
	overlay.style.display = "block";
	await sleep(2000);
	overlay.style.display = "none";
}

const agregarMonstruosAlHTML = (monstruos) => {
    mostrarSpinner();
    const lineasTabla = crearLineas(monstruos);
    const articlesCards = crearCards(monstruos);
    document.getElementById("cards-section-body").appendChild(articlesCards);
    document.getElementById("tbody-monstruo").appendChild(lineasTabla);
}

const eliminarMonstruosDelHTML = (monstruos) => {
    mostrarSpinner();
    const cardSection = document.getElementById("cards-section-body");
    const tbody = document.getElementById("tbody-monstruo");

    monstruos.forEach(element => {
        const row = tbody.querySelector(`[data-id="${element.id}"]`);
        if (row) {
            tbody.removeChild(row);
        }
        const card = cardSection.querySelector(`[data-id="${element.id}"]`);
        if (card) {
            cardSection.removeChild(card);
        }
    });
    
}

const agregarMonstruo = (form) =>{
    const {nombre, alias, defensa, miedo, tipo, volador, inmortalidad, invisibilidad, supervelocidad} = form;
    const monstruo = new Monstruo(null, nombre.value, tipo.value, alias.value, miedo.value, defensa.value, {
        volador: volador.checked,
        inmortalidad: inmortalidad.checked,
        invisibilidad: invisibilidad.checked,
        supervelocidad: supervelocidad.checked,
    });
    const maxId = monstruos.reduce((max, m) => (m.id > max ? m.id : max), 0);
    monstruo.id = maxId + 1;
    monstruos.push(monstruo);
	localStorage.setItem("monstruos", JSON.stringify(monstruos));
    agregarMonstruosAlHTML([monstruo]);
}

const actualizarMonstruo = (form) =>{
    const {nombre, alias, defensa, miedo, tipo, id} = form;
    const monstruo = new Monstruo(id.value, nombre.value, tipo.value, alias.value, miedo.value, defensa.value);
    const nuevosMonstruos = monstruos.filter(m => m.id == monstruo.id );
	localStorage.setItem("monstruos", JSON.stringify(nuevosMonstruos));
    agregarMonstruosAlHTML([monstruo]);
}

const eliminarMonstruo = (form) =>{
    const {id} = form;

    const nuevosMonstruos = monstruos.filter(elemento => elemento.id != id.value);
    const monstruoEliminado = monstruos.find(elemento => elemento.id == id.value);

	localStorage.setItem("monstruos", JSON.stringify(nuevosMonstruos));
    eliminarMonstruosDelHTML([monstruoEliminado]);
}

const validarCampo = (campo) => {
    const patron = /^([a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}\s?)*(?<!\s)$/;
    return patron.test(campo.value.trim());
};

const validarDatosForm = (form) => {
    const {nombre, alias, defensa, miedo, tipo, id} = form;

    if (nombre.value.trim() === '' || alias.value.trim() === '' || defensa.value.trim() === '' || miedo.value.trim() === '' || tipo.value.trim() === '') {
        alert("Todos los campos son obligatorios. Por favor, completa todos los campos.");
        return false;
    }
    if (!validarCampo(nombre) || !validarCampo(alias)) {
        alert("Por favor, ingresa un nombre y un alias válido.");
        return false;
    }
    if (!defensas.includes(defensa.value)){
        alert("El tipo de defensa seleccionado no es válido");
        return false;
    }
    if (miedo < miedoMin || miedo > miedoMax){
        alert(`El miedo debe tener un valor entre ${miedoMin} y ${miedoMax}`);
        return false;
    }
    if (!tipos.includes(tipo.value)){
        alert("El tipo de Monstruo seleccionado no es válido");
        return false;
    }
    return true;
};


const resetearForm = () =>{
    btnEliminar.classList.add("hidden");
    btnAgregar.classList.remove("hidden");
    btnGuardar.classList.add("hidden");
    btnCancelar.classList.remove("hidden");
    form.reset();
}

const tablaBody = document.getElementById("tbody-monstruo");
tablaBody.addEventListener("click", (e) =>{
    const selectedTR = e.target.parentElement;
    const nombre = selectedTR.getElementsByClassName("nombre")[0].textContent;
    const alias = selectedTR.getElementsByClassName("alias")[0].textContent;
    const defensa = selectedTR.getElementsByClassName("defensa")[0].textContent;
    const miedo = selectedTR.getElementsByClassName("miedo")[0].textContent;
    const tipo = selectedTR.getElementsByClassName("tipo")[0].textContent;
    const id = selectedTR.dataset.id;

    form.nombre.value = nombre;
    form.alias.value = alias;
    form.defensa.value = defensa;
    form.miedo.value = miedo;
    form.tipo.value = tipo;
    form.id.value = id;
    
    btnGuardar.classList.remove("hidden");
    btnEliminar.classList.remove("hidden");
})

window.addEventListener("DOMContentLoaded", () => {
    agregarMonstruosAlHTML(monstruos);
    btnEliminar.classList.add("hidden");
    btnGuardar.classList.add("hidden");
});

btnCancelar.addEventListener("click", (e) =>{
    e.preventDefault();
    resetearForm(form);
});

btnAgregar.addEventListener("click", (e) =>{
    e.preventDefault();
    const form = e.currentTarget.form;
    if (validarDatosForm(form)){
        
        agregarMonstruo(form);
    }
    
    resetearForm(form);
});

btnEliminar.addEventListener("click", (e)=>{
    e.preventDefault();
    const form = e.currentTarget.form;
    if (validarDatosForm(form)){
        const continuar = confirm("Estas por eliminar un monstruo. Deseas continuar?");
        if (!continuar){
            return;
        }
        eliminarMonstruo(form);
    }
    
    resetearForm(form);
});

btnGuardar.addEventListener("click", (e) =>{
    e.preventDefault();
    const form = e.currentTarget.form;
    if (validarDatosForm(form)){
        actualizarMonstruo(form);
    }
    
    resetearForm(form);
});




const liHome = document.getElementById("li-home");
const liMonstruo = document.getElementById("li-monstruo");
const formSection = document.getElementById("form-section");
const tableSection = document.getElementById("table-section");
const cardsSection = document.getElementById("cards-section");

liHome.addEventListener("click", (e)=>{
    formSection.classList.remove("hidden");
    tableSection.classList.remove("hidden");
    cardsSection.classList.add("hidden");
});
liMonstruo.addEventListener("click", (e)=>{
    formSection.classList.add("hidden");
    tableSection.classList.add("hidden");
    cardsSection.classList.remove("hidden");
});
