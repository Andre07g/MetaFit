export default class Contrato {
    #documento
    #telefono
    #nombre
    constructor(nombre, documento, telefono, planes = []) {
        this.#nombre = nombre
        this.#documento = documento
        this.#telefono = telefono
        this.planes = planes
    }

    getNombre() {
        return this.#nombre
    }

    getDocumento() {
        return this.#documento
    }

    getTelefono() {
        return this.#telefono
    }
}
