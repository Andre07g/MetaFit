import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import GestionService from '../services/gestion_service.js'
import ClientesService from "../services/clientes_service.js";
import PlanesService from "../services/planes_service.js"
import MovimientoFinanciero from "../models/Gestion_financiera.js"
import { ListarClientePorDocumento } from "./clientes_command.js";
import { preguntar, preguntarNum, opciones } from "../utils/utilidades.js";



let gestionServicio;
let clienteServicio;
let planesServicio; 



export function setBase(base,cliente) {
  gestionServicio = new GestionService(base);
 clienteServicio = new ClientesService(base);
 planesServicio = new PlanesService(base);
}


export async function CrearMovimiento(cliente) {
    try {
        console.log("Creando Ingreso")
        const tipo = await opciones("Ingreso", "Egreso");
        const fecha = new Date();
        switch (tipo) {
            case "Ingreso":
            const documento = await preguntar ("Ingrese el documento");
            if(documento.length !=10){throw new Error("El documento debe tener 10 digitos");}
            const clienteEncontrado = await clienteServicio.listarPorDocumento(documento);
            if (!clienteEncontrado){
                throw new Error ("El cliente no fue encontrado")
            }
            if(clienteEncontrado.planes.length === 0){
                throw new Error("El cliente no tiene planes");
                
            }
            const { planSeleccionado } = await inquirer.prompt([
                        {
                            type: "list",
                            name: "planSeleccionado",
                            message: "Seleccione el plan:",
                            choices: clienteEncontrado.planes.map(p => ({ name: `${p}`, value: p }))
                        }
                    ]);
            console.log(planSeleccionado)
            const planEncontrado = await planesServicio.buscarPorId(planSeleccionado);
            const nuevoIngreso = new MovimientoFinanciero(tipo,clienteEncontrado,planEncontrado,null, fecha, null,null);
            await gestionServicio.crearIngreso(nuevoIngreso);
            console.log("Ingreso creado correctamente");await sleep(1000);
            console.clear();
                break;
            case "Egreso":
                const concepto = await preguntar("Ingrese el concepto del egreso");
                if (concepto.length === 0){
                    throw new Error ("El concepto no puede estar vacío")
                };
                const descripcion = await preguntar("Ingrese descripcion del egreso");
                if (descripcion.length === 0){
                    throw new Error ("La descripción no puede estar vacío")
                };
                const costo = await preguntarNum("Ingrese el valor del egreso")
                if (isNaN(costo) || costo<=0){
                    throw new Error ("El egreso debe ser un valor númerico mayor a 0")
                };
                const nuevoEgreso = new MovimientoFinanciero(tipo,null,null,concepto,fecha,descripcion,costo)
                await gestionServicio.crearEgreso(nuevoEgreso);
                console.log("Egreso creado correctamente");
                ;await sleep(1000);
                        console.clear();
                break;
        }
    } catch (error) {
console.log("Hubo un error",error.message);await sleep(1000);
console.clear();
    }
}

export async function ListarPorTipo() {
    try {
        const tipoMovimiento = await opciones("Ingreso", "Egreso");
    const movimientosPorTipo = await gestionServicio.listarPorTipo(tipoMovimiento)
    console.log("============= Movimentos por Tipo =============")
    if (tipoMovimiento === "Ingreso"){
        movimientosPorTipo.forEach(m => { 
        console.log("---------------------------------")
        console.log(`${m.fecha}`);
        console.log(`${m.clienteNombre}`);
        console.log(`${m.planNombre}`);
        console.log(`${m.pago}`);
        console.log("---------------------------------")
    });
    ;await sleep(1000);
                        console.clear();
    }
    else {
        movimientosPorTipo.forEach(m => { 
            console.log("---------------------------------")
        console.log(`${m.fecha}`);
        console.log(`${m.concepto}`);
        console.log(`${m.descripcion}`);
        console.log(`${m.pago}`);
        console.log("---------------------------------")
    });
    ;await sleep(1000);
                        console.clear();
    }
    } catch (error) {
        console.log(error.message);await sleep(1000);
        console.clear();
    }
    

}

export async function ListarPorCliente() {
    try {
        
    const documento = await preguntar("Ingrese el documento");
    if (documento.length === 0){
        throw new Error("El campo de documento no puede estar vacío");
        ;await sleep(1000);
                        console.clear();
    };
    const clientePorDocumento = await clienteServicio.listarPorDocumento(documento);
    if (!clientePorDocumento){
        throw new Error("Cliente no encontrado");await sleep(1000);
        console.clear();
    };

    const movimientosPorCliente = await gestionServicio.listaPorCliente(clientePorDocumento._id);
    if(!movimientosPorCliente){
        throw new Error("Este cliente no posee movimientos");
    };
    console.log("============= Movimentos del cliente =============")
    movimientosPorCliente.forEach(m => { 
        console.log("---------------------------------")
        console.log(`${m.fecha}`);
        console.log(`${m.clienteNombre}`);
        console.log(`${m.planNombre}`);
        console.log(`${m.pago}`);
        console.log("---------------------------------")
    });
    } catch (error) {
        console.log(error.message);await sleep(1000);
        console.clear();
    }
}