import * as ClientesCommand from '../commands/clientes_command.js';
import * as ContratosCommand from '../commands/contratos_command.js';
import * as NutricionCommand from '../commands/nutricion_command.js';
import * as PlanesCommand from '../commands/planes_command.js';
import * as GestionCommand from '../commands/gestion_command.js';
import * as SeguimientoCommand from '../commands/seguimiento_command.js';
import { preguntar, preguntarNum, opciones, sleep, mostrarInicio } from '../utils/utilidades.js';
import { MongoClient } from 'mongodb'
import chalk from 'chalk';

export async function menuPrincipal(base, cliente) {
    let salirMain = false;
    GestionCommand.setBase(base, cliente);
    PlanesCommand.setBase(base);
    ClientesCommand.setBase(base);
    ContratosCommand.setbase(base, cliente);
    SeguimientoCommand.setBase(base, cliente);
    NutricionCommand.setBase(base);
    console.clear();
    await mostrarInicio();
    while (salirMain == false) {

        await sleep(1000);
        console.clear();
        const opcion = await opciones("Clientes", "Nutricion", "Planes de Entrenamiento", "Seguimiento", "Contratos", "Gestión Financiera", "Salir")
        console.log(opcion)
        switch (opcion) {
            case "Clientes":
                await sleep(1000);
                console.clear();
                await subMenuClientes();
                break;
            case "Planes de Entrenamiento":
                await sleep(1000);
                console.clear();
                await subMenuPlanes();
                break
            case "Seguimiento":
                await sleep(1000);
                console.clear();
                await subMenuSeguimiento(cliente);
                break
            case "Nutricion":
                await sleep(1000);
                console.clear();
                await subMenuNutricion();
                break
            case "Contratos":
                await sleep(1000);
                console.clear();
                await subMenuContratos(base,cliente);
                break
            case "Gestión Financiera":
                await sleep(1000);
                console.clear();
                await subMenuGestion();
                break
            case "Salir":
                await sleep(1000);
                console.clear();
                salirMain = true;
                console.log("Saliendo...")
                break
        }
    }
}

//-------------------submenús--------------------------


//===================================================
//                       CLIENTES
//===================================================
async function subMenuClientes() {
    let exitCliente = false;
    while (!exitCliente) {
        const opcionCliente = await opciones("Crear cliente", "Editar cliente", "Eliminar cliente", "Buscar cliente", "Listar clientes", "Regresar al menú anterior")

        switch (opcionCliente) {
            case "Crear cliente":
                await ClientesCommand.CrearCliente();
                break;
            case "Editar cliente":
                await ClientesCommand.EditarCliente();
                break;
            case "Eliminar cliente":
                await ClientesCommand.EliminarCliente();
                break;
            case "Buscar cliente":
                await ClientesCommand.ListarClientePorDocumento();
                break;
            case "Listar clientes":
                await ClientesCommand.ListarClientes();
                break;
            case "Regresar al menú anterior":
                exitCliente = true;
                break;
        }
    }
};

//===================================================
//                       PLANES
//===================================================

async function subMenuPlanes() {
    let exitPlanes = false;
    while (!exitPlanes) {

        const opcionPlanes = await opciones("Crear plan de entrenamiento", "Editar un plan de entrenamiento", "Eliminar un plan de entrenamiento", "Listar los planes de entrenamiento", "Regresar al menú anterior")

        switch (opcionPlanes) {
            case "Crear plan de entrenamiento":
                await PlanesCommand.CrearPlan();
                break;
            case "Editar un plan de entrenamiento":
                await PlanesCommand.EditarPlan();
                break;
            case "Eliminar un plan de entrenamiento":
                await PlanesCommand.Eliminarplan();
                break;
            case "Listar los planes de entrenamiento":
                await PlanesCommand.ListarPlanes();
                break;
            case "Regresar al menú anterior":
                exitPlanes = true;
                break;
        }
    }
};

//===================================================
//                      SEGUIMIENTO
//===================================================

async function subMenuSeguimiento(cliente) {
    let exitSeguimiento = false;
    while (!exitSeguimiento) {
        const opcionSeguimiento = await opciones("Registrar avance", "Eliminar Avance", "Ver avance de un cliente", "Regresar al menú anterior")

        switch (opcionSeguimiento) {
            case "Registrar avance":
                await SeguimientoCommand.CrearSeguimiento(cliente);
                break;
            case "Eliminar Avance":
                await SeguimientoCommand.EliminarSeguimiento(cliente)
                break;
            case "Ver avance de un cliente":
                await SeguimientoCommand.ListarSeguimientos(cliente)
                break;
            case "Regresar al menú anterior":
                exitSeguimiento = true;
                break;
        }
    }

};

//===================================================
//                      CONTRATOS
//===================================================

async function subMenuContratos(base,cliente) {
    let exitContratos = false;
    while (!exitContratos) {
        const opcionContratos = await opciones("Crear contrato", "Finalizar contrato", "Ver contratos", "Regresar al menú anterior")

        switch (opcionContratos) {
            case "Crear contrato":
                await ContratosCommand.CrearContrato(base, cliente);
                break;
            case "Finalizar contrato":
                await ContratosCommand.FinalizarContrato();
                break;
            case "Ver contratos":
                await ContratosCommand.ListarContratos();
                break;
            case "Regresar al menú anterior":
                exitContratos = true;
                break;
        }
    }
};

//===================================================
//                 GESTIÓN FINANCIERA
//===================================================

async function subMenuGestion(cliente) {
    let exitGestion = false;
    while (!exitGestion) {
        const opcionGestion = await opciones("Crear Movimiento", "Consultar Historial de Movimientos", "Movimientos por clientes", "Balance general", "Balance por Mes", "Balance por año", "Volver al menu anterior")
        switch (opcionGestion) {
            case "Crear Movimiento":
                await GestionCommand.CrearMovimiento(cliente);
                break;
            case "Consultar Historial de Movimientos":
                await GestionCommand.ListarPorTipo()
                break;
            case "Movimientos por clientes":
                await GestionCommand.ListarPorCliente()
                break;
            case "Balance general":
                await GestionCommand.ConsultaDeBalance();
                break;
            case "Balance por Mes":
                await GestionCommand.ConsultaDeBalanceMes();
                break; 
            case "Balance por año":
                await GestionCommand.ConsultaDeBalanceAnio();
                break;   
            case "Volver al menu anterior":
                exitGestion = true;
                break;
        }
    }
};

async function subMenuNutricion() {
    let exitNutricion = false;
    while (!exitNutricion) {
        const opcionNutricion
            = await opciones("Crear Plan Nutricional", "Eliminar Plan Nutricional", "Listar Planes", "Volver al menu anterior")
        switch (opcionNutricion) {
            case "Crear Plan Nutricional":
                await NutricionCommand.CrearPlan();
                break;
            case "Eliminar Plan Nutricional":
                await NutricionCommand.Eliminarplan();
                break;
            case "Listar Planes":
                await NutricionCommand.ListarPlanes();
                break;
            case "Volver al menu anterior":
                exitNutricion = true;
                break;
        }
    }
}
