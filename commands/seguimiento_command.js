import inquirer from "inquirer";
import SeguimientoService from "../services/seguimiento_service.js";
import Seguimiento from "../models/Seguimiento.js";
import ClientesService from "../services/clientes_service.js";
import { preguntar, preguntarNum, opciones } from '../utils/utilidades.js';
import { ObjectId } from "mongodb";

let clienteServicio;
let seguimientoServicio;

export function setBase(base, cliente) {
    clienteServicio = new ClientesService(base);
    seguimientoServicio = new SeguimientoService(base, cliente);

}

export async function CrearSeguimiento(cliente) {
    const session = cliente.startSession();
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
            if (isNaN(pesoActual)) { throw new Error("El peso debe ser un numero"); }
            const porcentajeDeGrasa = await preguntarNum("Ingrese el porcentaje de grasa");
            if (isNaN(porcentajeDeGrasa) || porcentajeDeGrasa>100 || porcentajeDeGrasa<0) { throw new Error("El porcentaje debe ser entre el 1 y el 100"); }
            let medidas = [];
            const pierna = await preguntarNum("Ingrese la medida de la pierna");
            if (isNaN(pierna)) { throw new Error("La medida debe ser numerica y no estar vacia"); }
            const brazo = await preguntarNum("Ingrese la medida del brazo");
            if (isNaN(brazo)) { throw new Error("La medida debe ser numerica y no estar vacia"); }
            const cintura = await preguntarNum("Ingrese medida de la cintura");
            if (isNaN(cintura)) { throw new Error("La medida debe ser numerica y no estar vacia"); }
            const pecho = await preguntarNum("Ingrese medida del pecho");
            if (isNaN(pecho)) { throw new Error("La medida debe ser numerica y no estar vacia"); }
            medidas.push({ parte: "pierna", valor: pierna }, { parte: "brazo", valor: brazo }, { parte: "cintura", valor: cintura }, { parte: "pecho", valor: pecho })
            const comentarios = await preguntar("Ingrese comentarios");
            if(comentarios.length<=0){throw new Error("El comentario no puede estar vacio");}
            const nuevoSeguimiento = new Seguimiento(new ObjectId(clienteSeleccionado._id), pesoActual, porcentajeDeGrasa, medidas, comentarios, new Date());
            console.log(nuevoSeguimiento)
            await seguimientoServicio.crearSeguimiento(nuevoSeguimiento);
            console.log("Seguimiento creado exitosamente")
        })
    } catch (error) {
        console.log("Error al crear seguimiento", error.message)
    } finally {
        await session.endSession();
    }
}

export async function EliminarSeguimiento(cliente) {
    const session = cliente.startSession();
    try {
        await session.withTransaction(async () => {
            const listaClientes = await clienteServicio.listarClientes();
            const clientesPorId = {};
            listaClientes.forEach(c => {
                clientesPorId[c._id.toString()] = c.nombre;
            });
            const listaSeguimientos = await seguimientoServicio.listarSeguimientos();
            const { seguimientoSeleccionado } = await inquirer.prompt([
                {
                    type: "list",
                    name: "seguimientoSeleccionado",
                    message: "Seleccione el cliente:",
                    choices: listaSeguimientos.map(c => ({ name: `${clientesPorId[c.clienteId.toString()] || "Cliente desconocido"} (fecha: ${c.fecha})`, value: c }))
                }
            ]);
            await seguimientoServicio.eliminarSeguimiento(seguimientoSeleccionado);
            console.log("Seguimiento eliminado correctamente")

        });
    } catch (error) {
        console.log("Error al eliminar seguimiento", error.message)
    } finally {
        await session.endSession();
    }
}

export async function ListarSeguimientos() {
  try {
    const seguimientoLista = await seguimientoServicio.listarSeguimientos();
    if (seguimientoLista.length === 0) {
      console.log("No hay seguimientos para mostrar");
      return;
    }

    // Traer los clientes
    const listaClientes = await clienteServicio.listarClientes();
    const clientesPorId = {};
    listaClientes.forEach(c => {
      clientesPorId[c._id.toString()] = c.nombre;
    });

    console.log("===================================");
    seguimientoLista.forEach(c => {
      const fechaFormateada = new Date(c.fecha).toISOString().split("T")[0];
      const nombreCliente = clientesPorId[c.clienteId.toString()] || "Cliente desconocido";

      console.log("-----------------------------------");
      console.log(`Cliente: ${nombreCliente}`);
      console.log(`Fecha: ${fechaFormateada}`);
      console.log(`Peso: ${c.pesoActual}`);
      console.log(`Porcentaje de grasa: ${c.porcentajeDeGrasa}`);
      console.log("Medidas:");
      console.log(`-Pierna: ${c.medidas[0].valor}`);
      console.log(`-Brazo: ${c.medidas[1].valor}`);
      console.log(`-Cintura: ${c.medidas[2].valor}`);
      console.log(`-Pecho: ${c.medidas[3].valor}`);
      console.log(`Comentarios: ${c.comentarios}`);
    });
    console.log("===================================");
  } catch (error) {
    console.log("Ocurrió un error al mostrar clientes", error.message);
  }
}