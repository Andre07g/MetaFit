import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import PlanesService from "../services/planes_service.js";
import Planes from "../models/Planes.js";

const planesServicio = new PlanesService();

export async function CrearPlan() {
    try {
        console.log("Creación de Plan");
        const nombre = await preguntar("Ingrese nombre del plan:");
        if (nombre.length === 0) { throw new Error("El nombre no puede estar vacio"); };
        const duracion = await preguntarNum("Ingrese la duracion(dias):");
        if (duracion!= Number) { throw new Error("La duracion debe ser un numero"); };
        const metaFisica = await opciones("Bajar de peso","Aumentar masa muscular","Mejorar rendimiento","Mejorar fuerza","Mejorar elasticidad");
        const nivel = await opciones("Principiante","Intermedio","Avanzado");
        const precio = await preguntarNum("Ingrese el precio");
        if (precio!= Number) { throw new Error("El precio debe ser un numero"); };
        const planNuevo = new Plan(nombre, duracion, metaFisica, nivel, precio);
        await planesServicio.crearPlan(planNuevo);
        console.log("Plan registrado correctamente");
    } catch (error) {
        console.log("Error al crear plan:", error)
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
        if (planSeleccionado.precio!= Number) { throw new Error("El precio debe ser un numero"); };

        await planesServicio.editarPlan(planSeleccionado._id,planSeleccionado);
        console.log("Plan actualizado correctamente");
    } catch (error) {
        console.log("Error al editar plan:", error);

    }
}

export async function  ListarPlanes() {
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
            console.log(`Documento: ${p.duracion}`);
            console.log(`Telefono: ${p.metaFisica}`)
            console.log(`Planes: ${p.precio}`);
        });
        console.log("===================================")
    } catch (error) {
       console.log("Ocurrió un error al mostrar planes",error) 
    }
}

export async function Eliminarplan(){
    try {
        console.log("Eliminar plan");
        const listaplanesEliminar = await planesServicio.listarplanes();
        if (listaplanesEliminar.length === 0) {
            console.log("No hay planes");
            return;
        }
        const { planSeleccionadoEliminar } = await inquirer.prompt([
            {
                type: "list",
                name: "planSeleccionadoEliminar",
                message: "Seleccione el plan:",
                choices: listaPlanes.map(p => ({ name: `${p.nombre} (Duracion: ${p.duracion}) (Precio: ${p.precio})`, value: p}))
            }
        ]);
        await planesServicio.eliminarPlan(planSeleccionadoEliminar);
        console.log("Plan eliminado correctamente");
    } catch (error) {
        console.log("Error al eliminar plan",error)
    }
}

