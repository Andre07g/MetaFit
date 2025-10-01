import {ObjectId} from "mongodb"

export default class SeguimientoRepositorio{
    constructor(base){
        this.coleccion=base.collection("seguimiento")
    }

    async crear(seguimiento){
        return await this.coleccion.insertOne(seguimiento)
    }

    async listar(){
        return await this.coleccion.find().toArray();
    }

    async eliminar(seguimiento){
        return await this.coleccion.deleteOne({_id:new ObjectId(seguimiento._id)});
    }
    async listarPorCliente(id){
        return await this.coleccion.find({clienteId:new Object(id)}).toArray();
    }
}

