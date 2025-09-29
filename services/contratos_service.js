import ContratosRepositorio from "../repositories/contratos_repository.js";
import ClientesRepositorio from "../repositories/clientes_repository.js";
import PlanesRepositorio from "../repositories/planes_repository.js";

export default class ContratosService {
    constructor(base,cliente) {
        this.repositorio = new ContratosRepositorio(base);
        this.clientesRepo = new ClientesRepositorio(base);
        this.planesRepo = new PlanesRepositorio(base);
        this.cliente = cliente;
    }

    async crearContrato(contratoObj, clienteObj, planObj,) {
        if (!contratoObj || !clienteObj || !planObj) {
            throw new Error("Datos incompletos");
        }
        const session = this.cliente.startSession();
        try {
            await session.withTransaction(async () => {
                await this.clientesRepo.asignarPlan(clienteObj,planObj);
                const contrato = {
                    clienteNombre: clienteObj.nombre,
                    clienteId: new Object(clienteObj._id),
                    planNombre: planObj.nombre,
                    planId: planObj._id,
                    duracion: contratoObj.duracion,
                    precio: planObj.precio,
                    fechaInicio: new Date(),
                    fechaFinalizacion: null
                };
                await this.repositorio.crear(contrato);
                console.log("Plan adquirido correctamente, contrato creado de forma exitosa");
            })
        }
        catch (error) {
            console.error("Error al realizar contrato:", error);
        } finally {
            await session.endSession();
        }

    }

    async listarContratos() {
        return await this.repositorio.listar();
    }

    async finalizar(contratoObj) {
        const session = this.cliente.startSession();
        try {
            await session.withTransaction(async () => {
                await this.repositorio.finalizar(contratoObj);
                await this.clientesRepo.eliminarPlan(contratoObj.clienteId,contratoObj.planId);
                console.log("Contrato cancelado exitosamente, el plan fue removido")
            })
        } catch (error) {
            console.error("Error al realizar contrato:", error);
        } finally {
            await session.endSession();
        }
    }
}

