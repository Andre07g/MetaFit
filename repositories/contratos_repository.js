import {ObjectId} from "mongodb"

export default class ContratosRepositorio{
    constructor(base){
        this.coleccion=base.collection("contratos")
    }

    async crear(contrato){
        return await this.coleccion.insertOne(contrato)
    }

    async listar(){
        return await this.coleccion.find().toArray();
    }

    async finalizar(contrato){
        return await this.coleccion.updateOne({_id:new ObjectId(contrato._id)},{$set:{fechaFinalizacion:new Date()}});
    }

}

