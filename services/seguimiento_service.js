import SeguimientoRepositorio from "../repositories/seguimiento_repository.js";

export default class SeguimientoService{
    constructor(base,cliente){
        this.repositorio=new SeguimientoRepositorio(base);
    }

    async crearSeguimiento(registroObj){
        if(!registroObj.clienteId ||!registroObj.pesoActual ||!registroObj.porcentajeDeGrasa ||!registroObj.medidas || !registroObj.comentarios || !registroObj.fecha){
            throw new Error("Datos incompletos o invalidos para el registro");
        }
        return await this.repositorio.crear(registroObj)
    }

    async listarSeguimientos(){
        return await this.repositorio.listar();
    }

    async eliminarSeguimiento(registroObj){
        return await this.repositorio.eliminar(registroObj)
    }
    async listarPorId(id){
        return await this.repositorio.listarPorCliente(id);
    }
}