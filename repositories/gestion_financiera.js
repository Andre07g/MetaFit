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

}

