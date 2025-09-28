import {ObjectId} from "mongodb"

export default class GestionFinancieraRepositorio{
    constructor(base){
        this.coleccion=base.collection("movimientos")
    }

    async crear(movimiento){
        return await this.coleccion.insertOne(movimiento)
    }

    async listar(){
        return await this.coleccion.find().toArray();
    }

    async eliminar(movimiento){
        return await this.coleccion.deleteOne({_id:new ObjectId(movimiento._id)});
    }

    async listarPorTipo(tipo){
        return await this.coleccion.find({tipo:tipo}).toArray()
    }

    async listarPorCliente (id){
        return await this.coleccion.find({clienteID: new ObjectId(id)}).toArray()
    }
}

