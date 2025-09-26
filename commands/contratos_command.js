import inquirer from "inquirer";
import ContratoService from "../services/contratos_service.js";
import ClientesService from "../services/clientes_service.js";
import PlanesService from "../services/planes_service.js"
import Contrato from "../models/Contrato.js";


const contratoServicio = new ContratoService();
const clienteServicio = new ClientesService();
const planesServicio = new PlanesService();


export async function CrearContrato() {
    const listaClientes = await clienteServicio.listarClientes();
    if (listaClientes.length === 0) {
        console.log("No hay clientes para editar");
        return;
    }
    const { clienteSeleccionado } = await inquirer.prompt([
        {
            type: "list",
            name: "clienteSeleccionado",
            message: "Seleccione el cliente:",
            choices: listaClientes.map(c => ({ name: `${c.nombre} (Documento: ${c.documento})`, value: c }))
        }
    ]);
    const listaPlanes = await planesServicio.listarPlanes();
    if (listaPlanes.length === 0) {
        console.log("No hay  planes para editar");
        return;
    }
    const { planSeleccionado } = await inquirer.prompt([
        {
            type: "list",
            name: "planSeleccionado",
            message: "Seleccione el plan:",
            choices: listaPlanes.map(p => ({ name: `${p.nombre} (Duracion: ${p.duracion}) (Precio: ${p.precio})`, value: p }))
        }
    ]);

    const nuevoContrato = new Contrato(clienteSeleccionado,planSeleccionado);
    await contratoServicio.crearContrato(nuevoContrato,clienteSeleccionado,planSeleccionado);
    console.log("Contrato creado exitosamente")
}

export async function ListarContratos() {
        await contratoServicio.listarContratos();
}

export async function FinalizarContrato() {
    try {
            const listaContratos = await contratoServicio.listarContratos();
    if (listaContratos.length === 0) {
        console.log("No hay contratos");
        return;
    }
    const { contratoSeleccionado } = await inquirer.prompt([
        {
            type: "list",
            name: "clienteSeleccionado",
            message: "Seleccione el cliente:",
            choices: listaContratos.map(c => ({ name: `${c.fecha} (${c.clienteNombre}---${c.planNombre})`, value: c }))
        }
    ]);
    await contratoServicio.finalizar(contratoSeleccionado);
    console.log("Contrato finalizado exitosamente")
    } catch (error) {
        console.log("Ocurrió un error",error)
    }
    
}
