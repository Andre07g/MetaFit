export default class Contrato{
    constructor(cliente,plan,fechaInicio=new Date()) {
    this.clienteNombre=cliente.nombre
    this.clienteID= cliente._id
    this.planNombre=plan.nombre
    this.planID=plan._id
    this.duracion=plan.duracion
    this.precio=plan.precio
    this.fechaInicio=fechaInicio
    this.fechaFinalizacion=null
}
}