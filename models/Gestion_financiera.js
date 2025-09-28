export default class MovimientoFinanciero {
    constructor({ tipo, cliente, plan, concepto, fecha = new Date(), descripcion}) {
        this.tipo = tipo; 
        this.fecha = fecha;
        if (tipo === "Ingreso") {
            this.clienteID = cliente._id;
            this.clienteNombre = cliente.nombre;
            this.planID = plan._id;
            this.planNombre = plan.nombre;
            this.pago = plan.precio;
        }
        if (tipo === "Egreso") {
            this.concepto = concepto;
            this.descripcion = descripcion;
            this.pago = pago;
        }
    }
}
