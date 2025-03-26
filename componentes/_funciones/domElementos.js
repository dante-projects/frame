export const crearElemento = (contenedor, elemento, clases = null, id = null) => {
    if (!contenedor || !elemento) {
        console.error("faltan parametros en la funcion crearElemento")
        return
    }
    const nuevoElemento = document.createElement(elemento)
    clases ? nuevoElemento.className = clases : null
    id ? nuevoElemento.id = id : null
    contenedor.appendChild(nuevoElemento)
    return nuevoElemento
}
