export default class Planes {
    #nombre
    #duracion
    #precio

    constructor(nombre, duracion, metaFisica, nivel, precio){
        this.#nombre = nombre
        this.#duracion = duracion
        this.metaFisica = metaFisica
        this.nivel = nivel
        this.precio = precio
    }


    getNombre(){
        return this.#nombre
    }

    getDuracion(){
        return this.#duracion
    }

    getPrecio(){
        return this.#precio
    }

    setPrecio(){
        return this.#precio
    }

};

