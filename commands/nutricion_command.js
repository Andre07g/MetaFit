import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import NutricionService from "../services/nutricion_service.js";
import ClientesService from "../services/clientes_service.js";
import Nutricion from "../models/Nutricion.js";
import {preguntar, preguntarNum, opciones } from '../utils/utilidades.js';

let nutricionService;
let clientesService;
export function setBase(base) {
  nutricionService = new NutricionService(base);
  clientesService = new ClientesService(base);
}
export async function CrearPlan() {
    try {
        console.log("Creación de Plan nutricional");
        const nombre = await preguntar("Ingrese nombre del plan:");
        if (nombre.length === 0) { throw new Error("El nombre no puede estar vacio"); };
        let almuerzo = [];
        let desayuno = []
        let cena = [];
        let cicloComidas = true;
        while (cicloComidas == true){
            let opcionAlimento = await opciones("Añadir desayuno","Añadir almuerzo","Añadir cena","Finalizado");
            switch (opcionAlimento) {
                case "Añadir desayuno":
                    const nombreDesayuno = await preguntar("Ingrese el nombre del desayuno");
                    if(nombreDesayuno.length===0){throw new Error("El nombre del desayuno no puede estar vacio");}
                    const caloriasDesayuno = await preguntarNum("Ingrese calorias del alimento")
                    if(isNaN(caloriasDesayuno) || caloriasDesayuno.length===0 || caloriasDesayuno<=0){throw new Error("Las calorias deben ser un numero mayor a 0");}
                    const nuevoDesayuno = {nombre:nombreDesayuno,calorias:caloriasDesayuno};
                    desayuno.push(nuevoDesayuno);
                    console.log("Desayuno añadido exitosamente");
                    break;
                case "Añadir almuerzo":
                    const nombreAlmuerzo = await preguntar("Ingrese el nombre del almuerzo");
                    if(nombreAlmuerzo.length===0){throw new Error("El nombre del almuerzo no puede estar vacio");}
                    const caloriasAlmuerzo = await preguntarNum("Ingrese calorias del alimento")
                    if(isNaN(caloriasAlmuerzo) || caloriasAlmuerzo.length===0 || caloriasAlmuerzo<=0){throw new Error("Las calorias deben ser un numero mayor a 0");}
                    const nuevoAlmuerzo = {nombre:nombreAlmuerzo,calorias:caloriasAlmuerzo};
                    almuerzo.push(nuevoAlmuerzo);
                    console.log("Almuerzo añadido exitosamente");
                    break;
                case "Añadir cena":
                    const nombreCena =await preguntar("Ingrese el nombre del cena");
                    if(nombreCena.length===0){throw new Error("El nombre del cena no puede estar vacio");}
                    const caloriasCena = await preguntarNum("Ingrese calorias del alimento")
                    if(isNaN(caloriasCena) || caloriasCena.length===0 || caloriasCena<=0){throw new Error("Las calorias deben ser un numero mayor a 0");}
                    const nuevoCena = {nombre:nombreCena,calorias:caloriasCena};
                    cena.push(nuevoCena);
                    console.log("Cena añadido exitosamente");
                    break;
                case "Finalizado":
                    if(desayuno.length<=0){console.log("Debes agregar al menos un desayuno");break;}
                    if(almuerzo.length<=0){console.log("Debes agregar al menos un almuerzo");break;}
                    if(cena.length<=0){console.log("Debes agregar al menos una cena");break;}
                    console.log("Volviendo al menu anterior");
                    cicloComidas=false;
                    break;
            }
        };
        const listaClientes = await clientesService.listarClientes();
        if (listaClientes.length === 0) {
            console.log("No hay clientes");
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
        const nuevoPlanNutricional = new Nutricion(nombre,desayuno,almuerzo,cena,new ObjectId(clienteSeleccionado._id));
        await nutricionService.crearPlanNutricional(nuevoPlanNutricional);
        console.log("Plan registrado correctamente");
    } catch (error) {
        console.log("Error al crear plan:", error)
    }
}


export async function  ListarPlanes() {
    try {
        const planesNutLista = await nutricionService.listarPlanesNutricionales();
        if (planesNutLista.length === 0) {
            console.log("No hay planes");
            return;
        }
        console.log("===================================")
        planesNutLista.forEach(p => {
            console.log("-----------------------------------");
            console.log(`Nombre: ${p.nombre}`);
            p.desayuno.forEach(pd=>{console.log(`Desayunos: ${pd.nombre}`);})
            p.almuerzo.forEach(pa=>{console.log(`Almuerzos: ${pa.nombre}`);})
            p.cena.forEach(pc=>{console.log(`Cenas: ${pc.nombre}`);})
        });
        console.log("===================================")
    } catch (error) {
       console.log("Ocurrió un error al mostrar planes",error) 
    }
}

export async function Eliminarplan(){
    try {
        console.log("Eliminar plan");
        const listaplanesEliminar = await nutricionService.listarPlanesNutricionales();
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
        await nutricionService.eliminarPlanNutricional(planSeleccionadoEliminar);
        console.log("Plan eliminado correctamente");
    } catch (error) {
        console.log("Error al eliminar plan",error)
    }
}

