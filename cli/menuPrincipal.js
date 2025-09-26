import * as ClientesCommand from '../commands/clientes_command.js';
// import * as ContratosCommand from '../commands/contratos_command.js';
// import * as NutricionCommand from '../commands/nutricion_command.js';
// import * as PlanesCommand from '../commands/planes_command.js';
// import * as SeguimientoCommand from `../commands/seguimiento_command.js`;
import {preguntar, preguntarNum, opciones,sleep } from '../utils/utilidades.js';
import {MongoClient} from 'mongodb'
let salir = false;
console.log('Bienvenido');

async function main(){
while (!salir){
    const { opcion } = await opciones("Clientes","Planes de Entrenamiento","Seguimiento","Contratos","Contratos","Gestión Financiera","Salir")

    switch (opcion) {
        case "Clientes":
            await subMenuClientes();
            console.log("submenuclientes")
            break;
        case "Planes de Entrenamiento":
            await subMenuPlanes();
            console.log("submenuplanes")
            break
        case "Seguimiento":
            await subMenuSeguimiento();
            console.log("submenuseguimiento")
            break
        case "Contratos":
            await subMenuContratos();
            console.log("submenu contratos")
            break
        case "Gestión Financiera":
            await subMenuGestion();
            break
        case "Salir":
            salir = true;
            console.log("Saliendo...")
            break
        default:
            break;
    }
}}

//-------------------submenús--------------------------


//===================================================
//                       CLIENTES
//===================================================
async function subMenuClientes() {
    const { opcionCliente } = await opciones("Crear cliente","Editar cliente","Eliminar cliente","Buscar cliente","Listar clientes","Regresar al menú anterior")

    switch (opcionCliente) {
        case "Crear cliente":
            await ClientesCommand.CrearCliente();
            break;
        case "Editar cliente":
            await ClientesCommand.EditarCliente();
            break;
        case "Eliminar cliente":
            console.log("eliminar cliente")
            break;
        case "Buscar cliente":
            console.log("buscar cliente")
            break;
        case "Listar clientes":
            console.log("listar cliente")
            break;
        case "Regresar al menú anterior":
            console.log("saliendo")
            break;
    }
};

//===================================================
//                       PLANES
//===================================================

async function subMenuPlanes() {
    const { opcionPlanes } = await opciones("Crear plan de entrenamiento","Editar un plan de entrenamiento","Eliminar un plan de entrenamiento","Listar los planes de entrenamiento","Regresar al menú anterior")

    switch (opcionPlanes) {
        case "Crear plan de entrenamiento":
            console.log("crear plan")
            break;
        case "Editar un plan de entrenamiento":
            console.log("editar plan")
            break;
        case "Eliminar un plan de entrenamiento":
            console.log("eliminar plan")
            break;
        case "Listar los planes de entrenamiento":
            console.log("listar planes")
            break;
        case "Regresar al menú anterior":
            console.log("regresar al menu anterior")
            break;
    }
    
};

//===================================================
//                      SEGUIMIENTO
//===================================================

async function subMenuSeguimiento() {
    const { opcionSeguimiento } = await opciones("Registrar avance","Eliminar Avance","Ver avance de un cliente","Regresar al menú anterior")

    switch (opcionSeguimiento) {
        case "Registrar avance":
            console.log("registri de avance")
            break;
        case "Eliminar Avance":
            console.log("eliminar avnace")
            break;
        case "Ver avance de un cliente":
            console.log("ver avance cliente")
            break;
        case "Regresar al menú anterior":
            console.log("regresar al menu anterior")
            break;
    }
    
};

//===================================================
//                      CONTRATOS
//===================================================

async function subMenuContratos() {
    const { opcionContratos } = await opciones("Crear contrato","Finalizar contrato","Ver contratos","Regresar al menú anterior")

    switch (opcionContratos) {
        case "Crear contrato":
            console.log("creacion contrato")
            break;
        case "Finalizar contrato":
            console.log("finalizar contrato")
            break;
        case "Ver contratos":
            console.log("ver contratos")
            break;
        case "Regresar al menú anterior":
            console.log("regresar al menu ante")
            break;
    
        default:
            break;
    }
};

//===================================================
//                 GESTIÓN FINANCIERA
//===================================================

async function subMenuGestion () {
    const { opcionGestion } = await opciones("Crear Ingreso","Crear Egreso","Ver historial de ingresos","Ver historial de egresos","Balance por clientes","Balance general","Volver al menu anterior")

    switch (opcionGestion) {
        case "Crear Ingreso":
            console.log("creacion de ingreso")
            break;
        case "Crear Egreso":
            console.log("creacion de egreso")
            break;
        case "Ver historial de ingresos":
            console.log("ver historial ingre")
            break;
        case "Ver historial de egresos":
            console.log("ver historial egre")
            break;
        case "Balance por clientes":
            console.log("balance clientes")
            break;
        case "Balance general":
            console.log("balance general")
            break;
        case "Volver al menu anterior":
            console.log("regresal al menu ante")
            break;
        default:
            break;
    }
};


let cliente;
let base;


export async function conectar(uri, nombreBD = "ignasio") {
  cliente = new MongoClient(uri);
  await cliente.connect();
  base = cliente.db(nombreBD);
  console.log("Conectado a MongoDB");
}

export function obtenerCliente() {
  return cliente;
}

export function obtenerBase() {
  return base;
}

export async function cerrarConexion() {
  await cliente?.close();
  console.log("Desconectando de MongoDB");
}

const uri = "mongodb+srv://edgar:1852467@cluster0.nw7rq1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
try {
  await conectar(uri);
  const base = obtenerBase();
 ClientesCommand.setBase(base);

//   await ClientesCommand.CrearCliente();
 await ClientesCommand.EditarCliente();
} catch (error) {
  console.error("Error en la aplicación:", error);
} finally {
  await cerrarConexion();
  console.log("Conexión a la base de datos cerrada.");
}


