// atributos 
// tipo         posicion / texto. si no se configura por defecto posicion
// captura1     requerido. para recoger los valores de "eliminar" desde componente principal pero lanzados por titulo
// captura2     requerido. para recoger los valores de "crear" desde componente principal pero lanzados por titulo

import { crearElemento } from "../_funciones/domElementos.js"
import { importarCss } from "../_funciones/importarCss.js"


class cajas extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        // importarCss(this.shadowRoot)

        this.tipo =  ["posicion", "texto"].includes(this.getAttribute("tipo"))
        ? this.getAttribute("tipo")
        : "posicion"
        
        this.shadowRoot.innerHTML += `
            <div id="contenedor" class="contenedor">
                <div id="contenedorFlotantes" class="contenedorflotantes"></div>
            </div>
        `

        const estilo = crearElemento(this.shadowRoot, "style")
        if (this.tipo === "posicion") {
            estilo.textContent = `
                :host {
                    --transicion: var(--transicionRapida);
                }
    
                .contenedor {
                    width: 100%;
                    height: auto;
    
                    .contenedorflotantes {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: var(--margenElementos);
                        width: 100%;
                        height: auto;
                        transition: var(--transicion);
    
                        .flotanteBox {
                            width: 100%;
                            height: 0;
                            overflow: hidden;
                            transition: var(--transicion);
    
                            .flotante {
                                position: relative;
                                width: 100%;
                                height: 90px;
                                border: 1px solid transparent;
                                border-radius: 4px;
                                cursor: pointer;
                                transition: var(--transicion);

                                .cajaPosicionada {
                                    position: absolute;
                                    top: 30%;
                                    left: 30%;
                                    width: 40%;
                                    height: 40%;
                                    border: 2px solid grey;
                                    transition: var(--transicion);
                                }
                            }
    
                            .visible {
                                border: 1px solid grey;
                            }
    
                            .seleccionado {
                                border: 1px solid red;
                            }
                        }
    
                        .abierto {
                            height: 100px;
                            transition: var(--transicion);
                        }
                    }
                }
            `    
        }
        this.shadowRoot.appendChild(estilo)
    }
    connectedCallback() {
        const transicion = getComputedStyle(this.shadowRoot.host).getPropertyValue("--transicion").split("s")[0]
        const contenedorFlotantes = this.shadowRoot.querySelector("#contenedorFlotantes")
        let seleccionado
        let flotantes

        let cont = 0
        const crearflotante = () => {
            const nuevaFlotanteBox = crearElemento(contenedorFlotantes, "div", "flotanteBox centrado")
            const nuevoFlotante = crearElemento(nuevaFlotanteBox, "div", "flotante")
            if (this.tipo === "posicion") {
                crearElemento(nuevoFlotante, "div", "cajaPosicionada centrado borderRadiusGrey").textContent = cont
            }
            cont += 1
            if (seleccionado) {
                contenedorFlotantes.insertBefore(nuevaFlotanteBox, seleccionado.parentNode.nextSibling)
            }
            return nuevoFlotante
        }

        const aplicarReactividad = (item) => {
            item.addEventListener("click", () => {
                seleccionar(item)
            })
        }

        function seleccionar(itemSeleccionado) {
            flotantes.forEach((item) => {
                item.classList.remove("seleccionado")
            })
            seleccionado = itemSeleccionado
            itemSeleccionado.classList.add("seleccionado")
        }

        function actualizarFlotantes() {
            flotantes = Array.from(contenedorFlotantes.querySelectorAll(".flotante"))
            return flotantes
        }

        function apertura(item) {
            item.classList.add("visible")
            item.parentNode.offsetHeight // recarga de la propiedad para la animacion
            item.parentNode.classList.add("abierto")
        }

        async function cierre(item) {
            item.classList.remove("visible")
            item.parentNode.classList.remove("abierto")
            return new Promise(resuelto => {
                setTimeout(() => {
                    resuelto()
                }, transicion * 1000)
            })
        }

        async function eliminar() {
            if (flotantes.length > 1) {
                const indexSeleccionado = flotantes.findIndex(item => item === seleccionado)
                const nuevoSeleccionado = indexSeleccionado > 0 
                    ? indexSeleccionado - 1 
                    : indexSeleccionado + 1
                seleccionar(flotantes[nuevoSeleccionado])
                await cierre(flotantes[indexSeleccionado])
                flotantes[indexSeleccionado].remove()    
            }
        }

        // especifica posicion
        function posicionar(posicion, item) {
            const posiciones = [0, 30, 60]
             item === "horizontal"
                ? seleccionado.querySelector(".cajaPosicionada").style.left = `${posiciones[posicion]}%`
                : seleccionado.querySelector(".cajaPosicionada").style.top = `${posiciones[posicion]}%`
        }

        seleccionado = crearflotante()
        flotantes = actualizarFlotantes()
        seleccionar(seleccionado)

        aplicarReactividad(seleccionado)
        apertura(seleccionado)
        
        // eventos.recibir(this, "crear", () => {
        //     seleccionado = crearflotante()
        //     aplicarReactividad(seleccionado)
        //     apertura(seleccionado)
        //     flotantes = actualizarFlotantes()
        //     seleccionar(seleccionado)
        // })

        // let bloqueoRepeticiones = 1
        // eventos.recibir(this, "eliminar", async () => {
        //         if (bloqueoRepeticiones !== 0) {
        //         bloqueoRepeticiones = 0
        //         await eliminar()
        //         actualizarFlotantes()
        //         bloqueoRepeticiones = 1
        //     }
        // })

        // eventos.recibir(this, "posHorizontal", (e) => {
        //     posicionar(e.detail, "horizontal")
        // })

        // eventos.recibir(this, "posVertical", (e) => {
        //     posicionar(e.detail, "vertical")
        // })
    }
}
customElements.define("cajas-flotantes", cajas)
