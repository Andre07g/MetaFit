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

    async buscarPorId(id) {
        return await this.coleccion.findOne({ _id: new ObjectId(id) });
    }

    async actualizarCliente(id, data) {
        return await this.coleccion.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }

    async eliminarCliente(id) {
        return await this.coleccion.deleteOne({ _id: new ObjectId(id) });
    }
}

