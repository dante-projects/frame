export const importarFunciones = async (dom, item) => {
    const script = document.createElement("script")
    script.type = "module"
    script.src = `https://cdn.jsdelivr.net/gh/dante-projects/frame@main/componentes/_funciones/${item}`

    const scriptCargado = new Promise((resolve, reject) => {
        script.onload = () => {
            console.log(`Script ${item} cargado correctamente`);
            resolve();
        };
        script.onerror = (error) => {
            console.error(`Error al cargar el script ${item}:`, error);
            reject(error);
        };
    });

    dom.appendChild(script)
    await scriptCargado;
}
