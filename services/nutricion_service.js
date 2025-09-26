import NutricionRepositorio from "../repositories/nutricion.repository.js";

export default class NutricionService{
    constructor(base){
        this.repositorio=new NutricionRepositorio(base);
    }

    async crearPlanNutricional(planNutricionalObj){
        if(!planNutricionalObj.nombre ||!planNutricionalObj.almuerzo ||!planNutricionalObj.desayuno ||!planNutricionalObj.cena || !planNutricionalObj.planId){
            throw new Error("El plan alimenticio debe tener nombre, almuerzo, desayuno y cena");
        }
        return await this.repositorio.crear(planNutricionalObj)
    }

    async editarPlanNutricional(id,planNutricionalEditado){
       if(!planNutricionalObj.nombre ||!planNutricionalObj.almuerzo ||!planNutricionalObj.desayuno ||!planNutricionalObj.cena || !planNutricionalObj.planId){
            throw new Error("El plan alimenticio debe tener nombre, almuerzo, desayuno y cena");
        }
        return await this.repositorio.editar(id, planNutricionalEditado)
    }

    async listarPlanesNutricionales(){
        return await this.repositorio.listar();
    }

    async eliminarPlanNutricional(planNutricionalObj){
        return await this.repositorio.eliminar(planNutricionalObj)
    }

}