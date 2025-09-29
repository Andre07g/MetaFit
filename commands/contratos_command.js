import inquirer from "inquirer";
import ContratoService from "../services/contratos_service.js";
import ClientesService from "../services/clientes_service.js";
import PlanesService from "../services/planes_service.js"
import Contrato from "../models/Contrato.js";
import { preguntar, preguntarNum, opciones } from '../utils/utilidades.js';

let contratoServicio;
let clienteServicio;
let planesServicio;

export function setbase(base, cliente) {
    contratoServicio = new ContratoService(base, cliente);
    clienteServicio = new ClientesService(base);
    planesServicio = new PlanesService(base);
}


export async function CrearContrato(base, cliente) {
    const listaClientes = await clienteServicio.listarClientes();
    if (listaClientes.length === 0) {
        console.log("No hay clientes");
        ;await sleep(1000);
                        console.clear();
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
        console.log("No hay  planes");
        ;await sleep(1000);
                        console.clear();
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

    const nuevoContrato = new Contrato(clienteSeleccionado, planSeleccionado);
    await contratoServicio.crearContrato(nuevoContrato, clienteSeleccionado, planSeleccionado);
    console.log("Contrato creado exitosamente");
    ;await sleep(1000);
                        console.clear();
}

export async function ListarContratos() {
    const contratos = await contratoServicio.listarContratos();
    if (contratos.length === 0) {
        console.log("No hay contratos");
        ;await sleep(1000);
                        console.clear();
        return;
    }
    console.log("================== Lista de Contratos =================");
    contratos.forEach(c => {
        console.log("-------------------------------------------------------");
        console.log(`Cliente: ${c.clienteNombre}`);
        console.log(`Plan: ${c.planNombre}`);
        console.log(`Duración: ${c.duracion}`);
        console.log(`Fecha de Inicio: ${c.fechaInicio.toLocaleDateString()}`);
        console.log(`Fecha de Finalización: ${c.fechaFinalizacion ? c.fechaFinalizacion.toLocaleDateString() : 'Activo'}`);
        console.log(`Precio: ${c.precio}`);
        console.log("-------------------------------------------------------");
    });

    console.log("=======================================================");
    ;await sleep(1000);
                        console.clear();
}

export async function FinalizarContrato() {
    try {
        const listaContratos = await contratoServicio.listarContratos();
        if (listaContratos.length === 0) {
            console.log("No hay contratos");
            ;await sleep(1000);
                        console.clear();
            return;
        }
        const { contratoSeleccionado } = await inquirer.prompt([
            {
                type: "list",
                name: "contratoSeleccionado",
                message: "Seleccione el contrato:",
                choices: listaContratos.map(c => ({ name: `${new Date(c.fechaInicio).toLocaleDateString('es-ES')} | Cliente: (${c.clienteNombre} | Plan: ${c.planNombre})`, value: c }))
            }
        ]);
        if(contratoSeleccionado.fechaFinalizacion){
            console.log("El contrato ya fue finalizado previamente");
            ;await sleep(1000);
                        console.clear();
            return;
        }
        await contratoServicio.finalizar(contratoSeleccionado);
        console.log("Contrato finalizado exitosamente");
        ;await sleep(1000);
                        console.clear();
    } catch (error) {
        console.log("Ocurrió un error", error.message);
        ;await sleep(1000);
                        console.clear();
    }

}
