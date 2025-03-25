const config = new URL("/componentes/_estilos/config.css", import.meta.url).href
const clases = new URL("/componentes/_estilos/clases.css", import.meta.url).href
const iconosGoogle = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
const css = [config, clases, iconosGoogle]

export const importarCss = (dom) => {
    css.forEach((item) => {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = item
        dom.appendChild(link)
    })
}