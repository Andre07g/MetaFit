export default class Contrato{
    constructor(cliente,plan,duracion,precio,fechaInicio=new Date()) {
    this.clienteNombre=cliente.nombre
    this.clienteID= cliente._id
    this.planNombre=plan.nombre
    this.planID=plan._id
    this.duracion=duracion
    this.precio=precio
    this.fechaInicio=fechaInicio
    this.fechaFinalizacion=null
}
}