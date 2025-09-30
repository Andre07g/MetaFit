import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import PlanesService from "../services/planes_service.js";
import Planes from "../models/Planes.js";
import {preguntar, preguntarNum, opciones,sleep } from '../utils/utilidades.js';
import chalk from "chalk";


let planesServicio;

export function setBase(base) {
  planesServicio = new PlanesService(base);
}

export async function CrearPlan() {
    try {
        console.log("Creación de Plan");
        const nombre = await preguntar("Ingrese nombre del plan:");
        if (nombre.length === 0) { throw new Error("El nombre no puede estar vacio"); };
        const duracion = await preguntarNum("Ingrese la duracion(dias):");
        if (isNaN(duracion) || duracion<=0) { throw new Error("La duracion debe ser un numero no menor de 0"); };
        const metaFisica = await opciones("Bajar de peso","Aumentar masa muscular","Mejorar rendimiento","Mejorar fuerza","Mejorar elasticidad");
        const nivel = await opciones("Principiante","Intermedio","Avanzado");
        const precio = await preguntarNum("Ingrese el precio");
        if (isNaN(precio) || precio<=0) { throw new Error("El precio debe ser un numero no menor de 0"); };
        const planNuevo = new Planes(nombre, duracion, metaFisica, nivel, precio);
        await planesServicio.crearPlan(planNuevo);
        console.log(chalk.green("Plan registrado correctamente"));await sleep(1000);
        console.clear();
    } catch (error) {
        console.log(chalk.red("Error al crear plan:", error.message));await sleep(1000);
        console.clear();
    }
}

export async function EditarPlan() {
    try {
        console.log("Edición de plan");
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
                choices: listaPlanes.map(p => ({ name: `${p.nombre} (Duracion: ${p.duracion}) (Precio: ${p.precio})`, value: p}))
            }
        ]);
        planSeleccionado.precio = await preguntarNum("Ingrese el nuevo precio:");
        if (isNaN(planSeleccionado.precio)) { throw new Error("El precio debe ser un numero"); };

        await planesServicio.editarPlan(planSeleccionado._id,planSeleccionado);
        console.log(chalk.green("Plan actualizado correctamente"));await sleep(1000);
        console.clear();
    } catch (error) {
        console.log(chalk.red("Error al editar plan:", error.message));await sleep(1000);
        console.clear();

    }
}

export async function ListarPlanes() {
    try {
        const planesLista = await planesServicio.listarPlanes();
        if (planesLista.length === 0) {
            console.log("No hay planes");
            return;
        }
        console.log("===================================")
        planesLista.forEach(p => {
            console.log("-----------------------------------");
            console.log(`Nombre: ${p.nombre}`);
            console.log(`Duracion: ${p.duracion}`);
            console.log(`Meta: ${p.metaFisica}`)
            console.log(`Precio: ${p.precio}`);
        });
        console.log("===================================");await preguntar("Presione cualquier tecla para volver");await sleep(1000);
        console.clear();
    } catch (error) {
       console.log(chalk.red("Ocurrió un error al mostrar planes",error.message)) ;await sleep(1000);
       console.clear();
    }
}

export async function Eliminarplan(){
    try {
        console.log("Eliminar plan");
        const listaplanesEliminar = await planesServicio.listarPlanes();
        if (listaplanesEliminar.length === 0) {
            console.log("No hay planes");
            return;
        }
        const { planSeleccionadoEliminar } = await inquirer.prompt([
            {
                type: "list",
                name: "planSeleccionadoEliminar",
                message: "Seleccione el plan:",
                choices: listaplanesEliminar.map(p => ({ name: `${p.nombre} (Duracion: ${p.duracion}) (Precio: ${p.precio})`, value: p}))
            }
        ]);
        await planesServicio.eliminarPlan(planSeleccionadoEliminar);
        console.log(chalk.green("Plan eliminado correctamente"));await sleep(1000);
        console.clear();
    } catch (error) {
        console.log(chalk.red("Error al eliminar plan",error.message));await sleep(1000);
        console.clear();
    }
}

