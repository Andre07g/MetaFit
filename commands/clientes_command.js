import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import ClientesService from "../services/clientes_service.js";
import Cliente from "../models/Cliente.js";
import {preguntar, preguntarNum, opciones } from '../utils/utilidades.js';


let clienteServicio;

export function setBase(base) {
  clienteServicio = new ClientesService(base);
}

export async function CrearCliente() {
    try {
        console.log("Creación de cliente")
        const nombre = await preguntar("Ingrese nombre completo:");
        if (nombre.length === 0) { throw new Error("El nombre no puede estar vacio"); };
        const documento = await preguntar("Ingrese el documento:");
        if (documento.length === 0) { throw new Error("El documento debe tener 10 digitos"); };
        const telefono = await preguntar("Ingrese el telefono:");
        if (telefono.length === 0) { throw new Error("El telefono debe tener 10 digitos (+57XXXXXXXXXX)"); };
        const planes = [];
        const clienteNuevo = new Cliente(nombre, documento, telefono,planes );
        await clienteServicio.agregarCliente(clienteNuevo);
        console.log("Cliente registrado correctamente");
    } catch (error) {
        console.log("Error al crear cliente:", error)
    }
}

export async function EditarCliente() {
    try {
        console.log("Edición de cliente");
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
        clienteSeleccionado.nombre = await preguntar("Ingrese nuevo nombre:");
        if (clienteSeleccionado.nombre.length === 0) { throw new Error("El nombre no puede estar vacio"); };
        clienteSeleccionado.documento = await preguntar("Ingrese el nuevo documento:");
        if (clienteSeleccionado.documento.length === 0) { throw new Error("El documento debe tener 10 digitos"); };
        clienteSeleccionado.telefono = await preguntar("Ingrese el nuevo telefono:");
        if (clienteSeleccionado.telefono.length === 0) { throw new Error("El telefono debe tener 10 digitos (+57XXXXXXXXXX)"); };

        await clienteServicio.editarCliente(clienteSeleccionado._id, clienteSeleccionado);
        console.log("Cliente actualizado correctamente");
    } catch (error) {
        console.log("Error al editar cliente:", error);

    }
}

export async function ListarClientes() {
    try {
        const clientesLista = await clienteServicio.listarClientes();
        if (clientesLista.length === 0) {
            console.log("No hay clientes para editar");
            return;
        }
        console.log("===================================")
        clientesLista.forEach(c => {
            console.log("-----------------------------------");
            console.log(`Nombre: ${c.nombre}`);
            console.log(`Documento: ${c.documento}`);
            console.log(`Telefono: ${c.telefono}`)
            console.log(`Planes: ${c.planes}`);
        });
        console.log("===================================")
    } catch (error) {
        console.log("Ocurrió un error al mostrar clientes", error)
    }
}

export async function ListarClientePorDocumento() {
    try {
        const documento = await preguntar("Ingrese el documento del cliente");
        const clienteEncontrado = await clienteServicio.listarPorDocumento(documento);
        if (!clienteEncontrado) { throw new Error("Cliente no encontrado"); }
        console.log("===================================")
        console.log(`Nombre: ${clienteEncontrado.nombre}`);
        console.log(`Documento: ${clienteEncontrado.documento}`);
        console.log(`Telefono: ${clienteEncontrado.telefono}`)
        console.log(`Planes: ${clienteEncontrado.planes}`)
        console.log("===================================");

    } catch (error) {
        console.log("Error al buscar cliente",error.message)
    }
}

export async function EliminarCliente() {
    try {
        console.log("Eliminar");
        const listaClientesEliminar = await clienteServicio.listarClientes();
        if (listaClientesEliminar.length === 0) {
            console.log("No hay clientes");
            return;
        }
        const { clienteSeleccionadoEliminar } = await inquirer.prompt([
            {
                type: "list",
                name: "clienteSeleccionadoEliminar",
                message: "Seleccione el cliente:",
                choices: listaClientesEliminar.map(c => ({ name: `${c.nombre} (Documento: ${c.documento})`, value: c }))
            }
        ]);
        await clienteServicio.eliminarCliente(clienteSeleccionadoEliminar);
        console.log("Cliente eliminado correctamente");
    } catch (error) {
        console.log("Error al eliminar cliente", error)
    }
}
