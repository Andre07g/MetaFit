export default class MovimientoFinanciero {
    constructor({ tipo, cliente, plan, concepto, fecha = new Date(), descripcion}) {
        this.tipo = tipo; 
        this.pago = pago;
        this.fecha = fecha;
        if (tipo === "Ingreso") {
            this.clienteID = cliente._id;
            this.clienteNombre = cliente.nombre;
            this.planID = plan._id;
            this.planNombre = plan.nombre;
        }
        if (tipo === "Egreso") {
            this.concepto = concepto;
            this.descripcion = descripcion;
        }
    }
}
