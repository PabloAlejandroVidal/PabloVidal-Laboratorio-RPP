export function crearLineas(monstruos) {
    const fragment = document.createDocumentFragment();
    
    monstruos.forEach((m)=>{
        const nuevaLinea = crearLinea(m);
        fragment.appendChild(nuevaLinea);
    })
    
    return fragment;
}

export function crearLinea (monstruo) {
    const atributos = ["nombre", "alias", "defensa", "miedo", "tipo"];
    const newRow = document.createElement("tr");
    newRow.classList.add("tr-monstruo");
    newRow.dataset.id = monstruo.id;

    atributos.forEach(clave => {
        if (clave == "id"){
            newRow.dataset.id = monstruo['id'];
        }else{
            const cell = document.createElement("td");
            cell.classList.add(clave);
            cell.textContent = monstruo[clave] || '';
            newRow.appendChild(cell);
        }
    });

    let superpoderes = 0;
    for (const poder in monstruo.poderes) {
        if (monstruo.poderes.hasOwnProperty(poder)) {
            if(monstruo.poderes[poder]){
                superpoderes++;   
            }
        }
    }
    const cell = document.createElement("td");
    cell.classList.add("poderes");
    cell.textContent = superpoderes;
    newRow.appendChild(cell);

    return newRow;
};