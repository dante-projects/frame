const config = "https://raw.githubusercontent.com/dante-projects/frame/main/componentes/_estilos/config.css";
const clases = "https://raw.githubusercontent.com/dante-projects/frame/main/componentes/_estilos/clases.css";const iconosGoogle = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
const css = [config, clases, iconosGoogle]

export const importarCss = async (dom) => {
    for (const item of css) {
        try {
            const respuesta = await fetch(item)
            if (respuesta.ok) {
                const estilo = document.createElement("style")
                estilo.textContent = await respuesta.text()
                dom.appendChild(estilo)
            }
        } catch (error) {
            console.log("No se cargo el recurso desde:" , item)
        }
    }
}