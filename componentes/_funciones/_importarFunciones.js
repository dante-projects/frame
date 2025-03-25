export const importarFunciones = (dom, item) => {
    console.log("importando:", item)
    const script = document.createElement("script")
    script.type = "module"
    script.src = `https://raw.githubusercontent.com/dante-projects/frame/main/${item}`
    dom.appendChild(script)
}