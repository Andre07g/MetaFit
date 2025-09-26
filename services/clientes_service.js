import ClientesRepositorio from "../repositories/clientes_repository.js";

export default class ClientesService {
    constructor(base) {
        this.repositorio = new ClientesRepositorio(base);
    }

    async agregarCliente(clienteObj){
        
        return await this.repositorio.crear(clienteObj);
    }
     
    async editarCliente(id,clienteObj){
        if(!clienteObj.nombre || !clienteObj.telefono || !clienteObj.documento){
            throw new Error("El cliente debe tener nombre, telefono y documento");
        }
        return await this.repositorio.actualizarCliente(id,clienteObj);
    }

    async listarClientes(){
        return await this.repositorio.listarTodos();
    }

    async listarPorId(id){
        return await this.repositorio.buscarPorId(id);
    }

    async eliminarCliente(clienteObj){
        return await this.repositorio.eliminarCliente(clienteObj._id);
    }

    async asignarPlan(cliente, plan){
        return await this.repositorio.asignarPlan(cliente,plan);
    }

    async eliminarPlan(cliente, plan){
        return await this.repositorio.eliminarPlan(cliente,plan);
    }

}
