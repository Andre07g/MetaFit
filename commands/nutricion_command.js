import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import NutricionService from "../services/nutricion_service.js";
import  Nutricion from "../models/Nutricion.js";

const nutricionServicio = new NutricionService();

export async function CrearPlan() {
    try {
        console.log("Creación de Plan nutricional");
        const nombre = await preguntar("Ingrese nombre del plan:");
        if (nombre.length === 0) { throw new Error("El nombre no puede estar vacio"); };
        let almuerzo = [];
        let desayuno = []
        let cena = [];
        while (opcionAlimento!=salir){
            let opcionAlimento = await opciones("Añadir desayuno","Añadir almuerzo","Añadir cena","Finalizado");
            switch (opcionAlimento) {
                case "Añadir desayuno":
                    const nombreDesayuno = preguntar("Ingrese el nombre del desayuno");
                    if(nombreDesayuno.length===0){throw new Error("El nombre del desayuno no puede estar vacio");}
                    const caloriasDesayuno = preguntarNum("Ingrese calorias del alimento")
                    if(caloriasDesayuno.length===0){throw new Error("No puede dejar el campo de calorias vacio");}
                    const nuevoDesayuno = {comida:nombreDesayuno,calorias:caloriasDesayuno};
                    desayuno.push(nuevoDesayuno);
                    console.log("Desayuno añadido exitosamente");
                    break;
                case "Añadir almuerzo":
                    const nombreAlmuerzo = preguntar("Ingrese el nombre del almuerzo");
                    if(nombreAlmuerzo.length===0){throw new Error("El nombre del almuerzo no puede estar vacio");}
                    const caloriasAlmuerzo = preguntarNum("Ingrese calorias del alimento")
                    if(caloriasAlmuerzo.length===0){throw new Error("No puede dejar el campo de calorias vacio");}
                    const nuevoAlmuerzo = {comida:nombreAlmuerzo,calorias:caloriasAlmuerzo};
                    almuerzo.push(nuevoAlmuerzo);
                    console.log("Almuerzo añadido exitosamente");
                    break;
                case "Añadir Cena":
                    const nombreCena = preguntar("Ingrese el nombre del cena");
                    if(nombreCena.length===0){throw new Error("El nombre del cena no puede estar vacio");}
                    const caloriasCena = preguntarNum("Ingrese calorias del alimento")
                    if(caloriasCena.length===0){throw new Error("No puede dejar el campo de calorias vacio");}
                    const nuevoCena = {comida:nombreCena,calorias:caloriasCena};
                    cena.push(nuevoCena);
                    console.log("Cena añadido exitosamente");
                    break;
                case "Finalizado":
                    console.log("Volviendo al menu anterior");
                    return;
            }
        }
        const { clienteSeleccionado } = await inquirer.prompt([
            {
                type: "list",
                name: "clienteSeleccionado",
                message: "Seleccione el cliente:",
                choices: listaClientes.map(c => ({ name: `${c.nombre} (Documento: ${c.documento})`, value: c }))
            }
        ]);
        const nuevoPlanNutricional = new Nutricion(nombre,desayuno,almuerzo,cena,clienteSeleccionado._id);
        await nutricionServicio.crearPlanNutricional(nuevoPlanNutricional);
        console.log("Plan registrado correctamente");
    } catch (error) {
        console.log("Error al crear plan:", error)
    }
}


export async function  ListarPlanes() {
    try {
        const planesNutLista = await nutricionServicio.listarPlanesNutricionales();
        if (planesNutLista.length === 0) {
            console.log("No hay planes");
            return;
        }
        console.log("===================================")
        planesNutLista.forEach(p => {
            console.log("-----------------------------------");
            console.log(`Nombre: ${p.nombre}`);
            console.log(`Documento: ${p.clienteId}`);
        });
        console.log("===================================")
    } catch (error) {
       console.log("Ocurrió un error al mostrar planes",error) 
    }
}

export async function Eliminarplan(){
    try {
        console.log("Eliminar plan");
        const listaplanesEliminar = await nutricionServicio.listarPlanesNutricionales();
        if (listaplanesEliminar.length === 0) {
            console.log("No hay planes");
            return;
        }
        const { planSeleccionadoEliminar } = await inquirer.prompt([
            {
                type: "list",
                name: "planSeleccionadoEliminar",
                message: "Seleccione el plan:",
                choices: listaplanesEliminar.map(p => ({ name: `${p.nombre}`, value: p}))
            }
        ]);
        await nutricionServicio.eliminarPlan(planSeleccionadoEliminar);
        console.log("Plan eliminado correctamente");
    } catch (error) {
        console.log("Error al eliminar plan",error)
    }
}

