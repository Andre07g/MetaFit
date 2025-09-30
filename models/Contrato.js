export default class Contrato{
    constructor(cliente,plan) {
    this.clienteNombre=cliente.nombre
    this.clienteID= cliente._id
    this.planNombre=plan.nombre
    this.planID=plan._id
    this.duracion=plan.duracion
    this.precio=plan.precio
    this.fechaInicio=new Date()
    this.fechaFinalizacion=null
}
}