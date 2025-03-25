// atributos:
// id           se pasa como texto a titulo

import "../basicos/tituloCrear.js"
import "../basicos/cajas.js"
import * as eventos from "../_funciones/eventosPersonalizados.js"
import { importarCss } from "../_funciones/importarCss.js"

class crearCajas extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        importarCss(this.shadowRoot)

        this.shadowRoot.innerHTML += `
            <div id="contenedor" class="contenedor">
                <titulo-crear id="${this.id}"></titulo-crear>
                <cajas-flotantes></cajas-flotantes>
                <div class="contenedorGruposRadio espaciadoHorizontal">
                    <grupo-radios id="posHorizontal" boxes="3" activo="2" iconos="arrow_left_alt,capture,arrow_right_alt"></grupo-radios>
                    <span class="separador"></span>
                    <grupo-radios id="posVertical" boxes="3" activo="2" iconos="arrow_upward_alt,fullscreen_portrait,arrow_downward_alt"></grupo-radios>
                </div>
            </div>
        `

        const estilo = document.createElement("style")
        estilo.textContent = `
            :host {
                width: 100%;
            }

            .contenedor {
                width: 100%;
                height: auto;

                .contenedorGruposRadio {
                    width: 100%;
                    height: auto;
                    margin-top: 10px;

                    .separador {
                        width: 12%;
                    }
                }
            }
        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {
        const titulo = this.shadowRoot.querySelector("titulo-crear")
        const marcos = this.shadowRoot.querySelector("cajas-flotantes")
        const posiciones = this.shadowRoot.querySelectorAll("grupo-radios")

        eventos.redirigir(titulo, "crear", marcos, "crear")
        eventos.redirigir(titulo, "eliminar", marcos, "eliminar")
    }
}
customElements.define("crear-cajas", crearCajas)