import inquirer from "inquirer";
import SeguimientoService from "../services/seguimiento_service.js";
import Seguimiento from "../models/Planes.js";
import ClientesService from "../services/clientes_service.js";
import { ObjectId } from "mongodb";
import {preguntar, preguntarNum, opciones } from '../utils/utilidades.js';

const seguimientoServicio = new SeguimientoService();
const clienteServicio = new ClientesService();

export async function CrearSeguimiento() {
    try {
        await session.withTransaction(async () => {
            const listaClientes = await clienteServicio.listarClientes();
            const { clienteSeleccionado } = await inquirer.prompt([
                {
                    type: "list",
                    name: "clienteSeleccionado",
                    message: "Seleccione el cliente:",
                    choices: listaClientes.map(c => ({ name: `${c.nombre} (Documento: ${c.documento})`, value: c }))
                }
            ]);
            const pesoActual = await preguntarNum("Ingrese el peso actual");
            if (pesoActual.length === 0) { throw new Error("El peso no puede estar vacio"); }
            const porcentajeDeGrasa = await preguntarNum("Ingrese el porcentaje de grasa");
            if (porcentajeDeGrasa.length === 0) { throw new Error("El porcentaje debe ser (1-100)"); }
            let medidas = [];
            const pierna = preguntarNum("Ingrese la medida de la pierna");
            if (pierna.length === 0) { throw new Error("La medida debe ser numerica y no estar vacia"); }
            const brazo = preguntarNum("Ingrese la medida del brazo");
            if (brazo.length === 0) { throw new Error("La medida debe ser numerica y no estar vacia"); }
            const cintura = preguntarNum("Ingrese medida de la cintura");
            if (cintura.length === 0) { throw new Error("La medida debe ser numerica y no estar vacia"); }
            const pecho = preguntarNum("Ingrese medida del pecho");
            if (pecho.length === 0) { throw new Error("La medida debe ser numerica y no estar vacia"); }
            medidas.push({ parte: "pierna", valor: pierna },{ parte: "brazo", valor: brazo },{ parte: "cintura", valor:cintura},{ parte: "pecho", valor: pecho })
            const comentarios = await preguntar("Ingrese comentarios");
            const nuevoSeguimiento = new Seguimiento(new Object(clienteSeleccionado._id),pesoActual,porcentajeDeGrasa,medidas,comentarios,fecha=new Date());
            await seguimientoServicio.CrearSeguimiento(nuevoSeguimiento);
            console.log("Seguimiento creado exitosamente")
        })
    } catch (error) {
        console.log("Error al crear seguimiento",error)
    }
}

export async function EliminarSeguimiento(){
    try {
        await session.withTransaction(async () => {
            const listaSeguimientos = await seguimientoServicio.listarSeguimientos();
            const { seguimientoSeleccionado } = await inquirer.prompt([
                {
                    type: "list",
                    name: "clienteSeleccionado",
                    message: "Seleccione el cliente:",
                    choices: listaSeguimientos.map(c => ({ name: `${c.clienteId} (fecha:${c.fecha})`, value: c }))
                }
            ]);
            await seguimientoServicio.eliminarSeguimiento(seguimientoSeleccionado);
            console.log("Seguimiento eliminado correctamente")

        });
    } catch (error) {
        console.log("Error al eliminar seguimiento",error)
    }
}

export async function ListarSeguimientos(){
    try {
        const seguimientoLista = await seguimientoServicio.listarSeguimientos();
        if (seguimientoLista.length === 0) {
            console.log("No hay seguimientos para mostrar");
            return;
        }
        console.log("===================================")
        seguimientoLista.forEach(c => {
            console.log("-----------------------------------");
            console.log(`ClienteId: ${c.clienteId}`);
            console.log(`Fecha: ${c.fecha}`);
            console.log(`Peso: ${c.pesoActual}`);
            console.log(`Porcentaje de grasa: ${c.porcentajeDeGrasa}`)
            console.log(`Medidas:`);
            console.log(`-Pierna: ${c.medidas[0].valor}`);
            console.log(`-Brazo: ${c.medidas[1].valor}`);
            console.log(`-Cintura: ${c.medidas[2].valor}`);
            console.log(`-Pecho: ${c.medidas[3].valor}`);
            console.log(`Comentarios: ${c.comentarios}`)
        });
        console.log("===================================")
    } catch (error) {
        console.log("Ocurrió un error al mostrar clientes", error)
    }
}

