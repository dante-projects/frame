export const enviar = (dom, nombreEvento, datos, burbujeo = null, restringido = null) => {
    const evento = new CustomEvent(nombreEvento, {
        detail: datos,
        bubbles: burbujeo,
        composed: restringido
    })
    dom.dispatchEvent(evento)
}

export const recibir = (dom, nombreEvento, callback) => {
    dom.addEventListener(nombreEvento, (e) => {
        callback(e.detail)
    })
}

export const redirigir = (domOrigen, nombreEventoOrigen, domDestino, nombreEventoDestino) => {
    domOrigen.addEventListener(nombreEventoOrigen, (e) => {
        const eventoReenviado = new CustomEvent(nombreEventoDestino, {
            detail: e.detail
        })
        domDestino.dispatchEvent(eventoReenviado)
    })
}