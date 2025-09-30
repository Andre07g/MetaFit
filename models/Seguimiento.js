export default class Seguimiento {

    constructor(clienteId, pesoActual, porcentajeDeGrasa, medidas, comentarios,fecha){
        this.clienteId = clienteId
        this.pesoActual = pesoActual
        this.porcentajeDeGrasa = porcentajeDeGrasa
        this.medidas = medidas
        this.comentarios = comentarios
        this.fecha=fecha
    }
}
