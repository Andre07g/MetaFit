import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import GestionService from '../services/gestion_service.js'
import ClientesService from "../services/clientes_service.js";
import PlanesService from "../services/planes_service.js"
import MovimientoFinanciero from "../models/Gestion_financiera.js"
import { ListarClientePorDocumento } from "./clientes_command.js";
import { preguntar, preguntarNum, opciones } from "../utils/utilidades.js";

const gestionServicio = new GestionService();
const clienteServicio = new ClientesService();
const planesServicio = new PlanesService();


export async function CrearIngreso() {
    try {
        console.log("Creando Ingreso")
        const tipo = await opciones("Ingreso", "Egreso");
        const fecha = new Date();
        switch (tipo) {
            case "Ingreso":
            const documento = preguntar ("Ingrese el documento")
            const clienteEncontrado = await clienteServicio.listarPorDocumento(documento);
            if (!clienteEncontrado){
                throw new Error ("El cliente no fue encontrado")
            }
            const { planSeleccionado } = await inquirer.prompt([
                        {
                            type: "list",
                            name: "planSeleccionado",
                            message: "Seleccione el cliente:",
                            choices: clienteEncontrado.planes.map(p => ({ name: `${p._id}`, value: p._id }))
                        }
                    ]);
            const planEncontrado = await planesServicio.buscarPorId(planSeleccionado);
            const nuevoIngreso = {
                tipo: tipo,
                clienteID : clienteEncontrado._id,
                clienteNombre: clienteEncontrado.nombre,
                planID: planEncontrado._id,
                planNombre: planEncontrado.nombre,
                pago: planEncontrado.precio,
                fecha: fecha
            }

            await gestionServicio.crearIngreso(nuevoIngreso);
            console.log("Ingreso creado correctamente")

                break;
            case "Egreso":
                const concepto = preguntar("Ingrese el concepto del egreso");
                if (concepto.length === 0){
                    throw new Error ("El concepto no puede estar vacío")
                };
                const descripcion = preguntar("Ingrese el concepto del egreso");
                if (descripcion.length === 0){
                    throw new Error ("La descripción no puede estar vacío")
                };
                const costo = preguntarNum("Ingrese el valor del egreso")
                if (isNaN(costo)){
                    throw new Error ("El egreso debe ser un valor númerico")
                };
                if (costo < 0){
                    throw new Error("El valor del costo debe ser mayor a 0")
                }
                const nuevoEgreso = {
                    tipo: tipo,
                    concepto: concepto,
                    descripcion: descripcion,
                    fecha: fecha
                }

                await gestionServicio.crearEgreso(nuevoEgreso);
                console.log("Egreso creado correctamente");
                break;
        }
    } catch (error) {

    }
}

export async function ListarPorTipo() {
    const tipoMovimiento = await opciones("Ingreso", "Egreso");
    const movimientosPorTipo = await gestionServicio.listarPorTipo(tipoMovimiento)
    console.log("============= Movimentos por Tipo =============")
    if (tipoMovimiento === "Ingreso"){
        movimientosPorTipo.forEach(m => { 
        console.log(`${m.fecha}`);
        console.log(`${m.clienteNombre}`);
        console.log(`${m.planNombre}`);
        console.log(`${m.pago}`);
    });
    }
    else {
        movimientosPorTipo.forEach(m => { 
        console.log(`${m.fecha}`);
        console.log(`${m.concepto}`);
        console.log(`${m.descripcion}`);
        console.log(`${m.pago}`);
    });
    }

}

export async function ListarPorCliente() {
    const documento = await preguntar("Ingrese el documento");
    if (documento.length === 0){
        throw new Error("El campo de documento no puede estar vacío")
    };
    const clientePorDocumento = await clienteServicio.listarPorDocumento(documento);
    if (!clientePorDocumento){
        throw new Error("Cliente no encontrado")
    };

    const movimientosPorCliente = await gestionServicio.listaPorCliente(clientePorDocumento._id);
    if(!movimientosPorCliente){
        throw new Error("Este cliente no posee movimientos");
    };
    console.log("============= Movimentos del cliente =============")
    movimientosPorCliente.forEach(m => { 
        console.log(`${m.fecha}`);
        console.log(`${m.clienteNombre}`);
        console.log(`${m.planNombre}`);
        console.log(`${m.pago}`);
    });
}