export function crearCards(monstruos) {
    const atributos = ["nombre", "alias", "defensa", "miedo", "tipo"];
    const fragment = document.createDocumentFragment();
    monstruos.forEach(m=>{
        const article = document.createElement("article");
        article.classList.add("card");
        article.dataset.id = m.id;
        
        const header = document.createElement("header");
        
        const titulo = document.createElement("h3");
        titulo.classList.add("nombre");
        titulo.textContent = m["nombre"];
        
        header.appendChild(titulo);
        
        article.appendChild(header);
        article.classList.add(m.tipo);
        
        const listaDescriptiva = document.createElement("dl");
        listaDescriptiva.classList.add("cuerpo");
        
        atributos.forEach(atributo => {
            const divAtributo = document.createElement("div");
            divAtributo.classList.add("card-atributo");
            
            const dt = document.createElement("dt");
            dt.classList.add("etiqueta");
            dt.textContent = atributo;
            
            const dd = document.createElement("dd");
            dd.classList.add("descripcion");
            dd.textContent = m[atributo];
            
            divAtributo.appendChild(dt);
            divAtributo.appendChild(dd);
            
            listaDescriptiva.appendChild(divAtributo);

        });



        article.appendChild(listaDescriptiva);

        if (m.poderes && Object.keys(m.poderes).length > 0) {
            const div = document.createElement("div");
        
            for (const poder in m.poderes) {
                if (m.poderes.hasOwnProperty(poder)) {
                    
                    const divAtributo = document.createElement("div");
                    divAtributo.classList.add("card-superpoder");
                    
                    const dt = document.createElement("dt");
                    dt.classList.add("etiqueta");
                    dt.classList.add("etiqueta-poder");
                    dt.textContent = poder;
                    
                    const dd = document.createElement("dd");
                    dd.classList.add("descripcion");
                    dd.classList.add("descripcion-poder");
                    dd.textContent = m.poderes[poder];

                    divAtributo.appendChild(dt);
                    divAtributo.appendChild(dd);

                    listaDescriptiva.appendChild(divAtributo);
                }
            }
        }
        
        fragment.appendChild(article);
    });

    return fragment;
}
