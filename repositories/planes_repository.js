import {ObjectId} from "mongodb"

export default class PlanesRepositorio{
    constructor(base){
        this.coleccion=base.collection("planes")
    }

    async crear(plan){
        return await this.coleccion.insertOne(plan)
    }

    async listar(){
        return await this.coleccion.find().toArray();
    }

    async editar(id,data){
        return await this.coleccion.updateOne({_id:new ObjectId(id)},{$set:data});
    }

    async eliminar(plan){
        return await this.coleccion.deleteOne({_id:new ObjectId(plan._id)});
    }

    async buscarId(id){
        return await this.coleccion.findOne({_id:new ObjectId(id)});
    }
}

