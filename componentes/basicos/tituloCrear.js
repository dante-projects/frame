import { importarFunciones } from "../_funciones/_importarFunciones.js"
import { crearElemento } from "../_funciones/domElementos.js"
import { importarCss } from "../_funciones/importarCss.js"

// import * as eventos from "../_funciones/eventosPersonalizados.js"
// import { crearElemento } from "../_funciones/domElementos.js"

class tituloCrear extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        importarCss(this.shadowRoot)

        console.log(importarFunciones(this.shadowRoot, "domElementos.js"))

        this.shadowRoot.innerHTML += `
            <div class="contenedor borderRadiusGrey">
                <div id="titulo" class="titulo"></div>
                <div class="boxBotones">
                    <div id="eliminar" class="icono material-symbols-outlined">delete</div>
                    <div id="crear" class="icono material-symbols-outlined">magnify_fullscreen</div>
                </div>
            </div>
        `

        // const estilo = crearElemento(this.shadowRoot, "style")
        // estilo.textContent = `
        //     .contenedor {
        //         display: flex;
        //         align-items: center;
        //         justify-content: space-between;
        //         width: 100%;
        //         height: var(--anchoBoton);
        //         transition: var(--transicion);

        //         &:hover {
        //             cursor: pointer;
        //             color: red;
        //         }

        //         .titulo {
        //             display: flex;
        //             align-items: center;
        //             width: calc(100% - 2.4 * var(--anchoBoton));
        //             height: 100%;
        //             text-indent: 10px;
        //         }

        //         .boxBotones {
        //             display: flex;
        //             justify-content: space-between;
        //             align-items: center;
        //             width: calc(var(--anchoBoton) * 2.4);

        //             .icono {
        //                 display: flex;
        //                 justify-content: center;
        //                 align-items: center;
        //                 width: 30px;
        //                 height: 30px;
        //                 cursor: pointer;
        //             }
        //         }
        //     }
        // `
    }
    connectedCallback() {

        // const titulo = this.shadowRoot.querySelector("#titulo")
        // titulo.textContent = this.id
        // const eliminar = this.shadowRoot.querySelector("#eliminar")
        // const crear = this.shadowRoot.querySelector("#crear")

        // eliminar.addEventListener("click", (evento) => {
        //     eventos.enviar(this, "eliminar", {detail: true})
        // })

        // crear.addEventListener("click", () => {
        //     eventos.enviar(this, "crear", {detail: true})
        // })
    }
}
customElements.define("titulo-crear", tituloCrear)
