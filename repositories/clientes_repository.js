import { ObjectId } from "mongodb";


export default class ClientesRepositorio {
    constructor(base) {
        this.coleccion = base.collection("clientes");
    }

    async crear(cliente) {
        return await this.coleccion.insertOne(cliente);
    }

    async listarTodos() {
        return await this.coleccion.find().toArray();
    }

    async buscarPorDocumento(documento) {
        return await this.coleccion.findOne({ documento: documento });
    }

    async actualizarCliente(id,data) {
        return await this.coleccion.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }

    async eliminarCliente(id) {
        return await this.coleccion.deleteOne({ _id: new ObjectId(id) });
    }

    async asignarPlan (cliente,plan){
        return await this.coleccion.updateOne({ _id:new ObjectId(cliente._id)},{$push:{planes:new ObjectId(plan._id)}})
    }

    async eliminarPlan(clienteId,planId){
        return await this.coleccion.updateOne({_id:new ObjectId(clienteId)},{$pull:{planes:new ObjectId(planId)}})
    }

    async buscarPorId(Id){
        return await this.collection.findOne({_id: new ObjectId(Id)})
    }

}

