import PlanesRepositorio from "../repositories/planes_repository.js";

export default class PlanesService{
    constructor(base){
        this.repositorio=new PlanesRepositorio(base);
    }

    async crearPlan(planObj){
        if(!planObj.nombre ||!planObj.duracion ||!planObj.metaFisica ||!planObj.nivel ||!planObj.precio){
            throw new Error("El plan debe tener nombre, duracion, meta fisica, nivel y precio");
        }
        return await this.repositorio.crear(planObj)
    }

    async editarPlan(id,planObj){
        if(!planObj.nombre ||!planObj.duracion ||!planObj.metaFisica ||!planObj.nivel || !planObj.precio){
            throw new Error("El plan debe tener nombre, duracion, meta fisica y nivel");
        }
        return await this.repositorio.editar(id, planObj)
    }

    async listarPlanes(){
        return await this.repositorio.listar();
    }

    async eliminarPlan(planObj){
        return await this.repositorio.eliminar(planObj)
    }
    
    async buscarPorId(id){
        return await this.repositorio.buscarId(id)
    }
}