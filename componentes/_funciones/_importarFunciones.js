export const importarFunciones = async (dom, item) => {
    const script = document.createElement("script")
    script.type = "module"
    script.src = `https://cdn.jsdelivr.net/gh/dante-projects/frame@main/componentes/_funciones/${item}`
    dom.appendChild(script)

    const scriptCargado = new Promise((resolve) => {
        script.onload = () => resolve()
    })
    return script
}
