import {ObjectId} from "mongodb"

export default class NutricionRepositorio{
    constructor(base){
        this.coleccion=base.collection("nutricion")
    }

    async crear(planNutricional){
        return await this.coleccion.insertOne(planNutricional)
    }

    async listar(){
        return await this.coleccion.find().toArray();
    }

    async editar(id,data){
        return await this.coleccion.updateOne({_id:new ObjectId(id)},{$set:data});
    }

    async eliminar(planNutricional){
        return await this.coleccion.deleteOne({_id:new ObjectId(planNutricional._id)});
    }

}

