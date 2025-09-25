import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import ClientesService from "../services/clientes_service.js";
import Clientes from "../models/Cliente.js";

const clienteServicio = new ClientesService();

export async function CrearCliente() {
    try {
        console.log("Creación de cliente")
        const nombre = await preguntar("Ingrese nombre completo:");
        if (nombre.length === 0) { throw new Error("El nombre no puede estar vacio"); };
        const documento = await preguntar("Ingrese el documento:");
        if (documento.length === 0) { throw new Error("El documento debe tener 10 digitos"); };
        const telefono = await preguntar("Ingrese el telefono:");
        if (telefono.length === 0) { throw new Error("El telefono debe tener 10 digitos (+57XXXXXXXXXX)"); };
        const clienteNuevo = new Cliente(nombre, documento, telefono);
        await clienteServicio.agregarCliente(clienteNuevo);
        console.log("Cliente registrado correctamente");
    } catch (error) {
        console.log("Error al crear cliente:", error)
    }
}

export async function EditarCliente() {
    try {
        console.log("Edición de personaje");
        const listaClientes = await clienteServicio.listar();
        if (listaClientes.length === 0) {
            console.log("No hay clientes para editar");
            return;
        }
        const { clienteSeleccionado } = await inquirer.prompt([
            {
                type: "list",
                name: "clienteSeleccionado",
                message: "Seleccione el cliente:",
                choices: listaClientes.map(c => ({ name: `${c.nombre} (Documento: ${c.documento})`, value: c}))
            }
        ]);
        clienteSeleccionado.nombre = await preguntar("Ingrese nuevo nombre:");
        if (nombre.length === 0) { throw new Error("El nombre no puede estar vacio"); };
        clienteSeleccionado.documento = await preguntar("Ingrese el nuevo documento:");
        if (documento.length === 0) { throw new Error("El documento debe tener 10 digitos"); };
        clienteSeleccionado.telefono = await preguntar("Ingrese el nuevo telefono:");
        if (telefono.length === 0) { throw new Error("El telefono debe tener 10 digitos (+57XXXXXXXXXX)"); };

        await clienteServicio.editarCliente(clienteSeleccionado._id,clienteSeleccionado);
        console.log("Cliente actualizado correctamente");
    } catch (error) {
        console.log("Error al editar cliente:", error);

    }
}

