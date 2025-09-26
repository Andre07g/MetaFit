import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import GestionService from "../services/gestion_service.js";
import ClientesService from "../services/clientes_service.js";
import PlanesService from "../services/planes_service.js"
import MovimientoFinanciero from "../models/Gestion_financiera.js"
import { ListarClientePorDocumento } from "./clientes_command.js";


const gestionServicio = new GestionService();
const clienteServicio = new ClientesService();
const planesServicio = new PlanesService();


export async function CrearIngreso() {
    try {
        console.log("Creando Ingreso")
        const tipo = await opciones("Ingreso", "Egreso");
        switch (tipo) {
            case "Ingreso":
            const documento = preguntar ("Ingrese el documento")
            const clienteEncontrado = await clienteServicio.listarPorDocumento(documento);
            if (!clienteEncontrado){
                throw new Error ("El cliente no fue encontrado")
            }
            const { planSeleccionado } = await inquirer.prompt([
                        {
                            type: "list",
                            name: "planSeleccionado",
                            message: "Seleccione el cliente:",
                            choices: clienteEncontrado.planes.map(p => ({ name: `${p._id}`, value: p._id }))
                        }
                    ]);
            const planEncontrado = await planesServicio.buscarPorId(planSeleccionado);
            const fecha = new Date();
            const nuevoIngreso = {
                tipo: tipo,
                clienteID : clienteEncontrado._id,
                clienteNombre: clienteEncontrado.nombre,
                planID: planEncontrado._id,
                planNombre: planEncontrado.nombre,
                pago: planEncontrado.precio,
                fecha: fecha
            }

            await gestionServicio.crearIngreso(nuevoIngreso);
            console.log("Ingreso creado correctamente")

                break;
            case "Egreso":

                break;
        }
    } catch (error) {

    }
}


//preguntar, preguntarNo, opciones
