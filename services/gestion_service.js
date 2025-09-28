import GestionFinancieraRepositorio from "../repositories/gestion_repository.js"

export default class GestionService{
    constructor(base,cliente){
        this.repositorio = new GestionFinancieraRepositorio(base);
    }

    async crearIngreso(movimientoObj){
        return await this.repositorio.crear(movimientoObj)
    }

    async crearEgreso(movimientoObj){
        return await this.repositorio.crear(movimientoObj)
    }

    async listarMovimientos(){
        return await this.repositorio.listar()
    }

    async listarPorTipo(tipo){
        return await this.repositorio.listarPorTipo(tipo)
    }

    async listaPorCliente(id){
        return await this.repositorio.listarPorCliente(id)
    }
}

//crear ingreso y egreso
// listar ingresos y egresos
//mostrar balance general
//historial de un cliente 