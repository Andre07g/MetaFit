const { default: Choice } = require("inquirer/lib/objects/choice");
const { default: Choices } = require("inquirer/lib/objects/choices");


let salir = false;
console.log('Bienvenido');

while (!salir){
    const { opcion } = await preguntarOpcion([
        {
            type: "list",
            name: "opcion",
            message: "Seleccione una opción",
            choices: [
                {name: "Clientes", value: "1"},
                {name: "Planes de Entrenamiento", value: "2"},
                {name: "Seguimiento", value: "3"},
                {name: "Contratos", value: "4"},
                {name: "Gestión Financiera", value: "5"},
                {name: "Salir", value: "6"}
            ]
        }
    ]);

    switch (opcion) {
        case "1":
            await subMenuClientes();
            console.log("submenuclientes")
            break;
        case "2":
            await subMenuPlanes();
            console.log("submenuplanes")
            break
        case "3":
            await subMenuSeguimiento();
            console.log("submenuseguimiento")
            break
        case "4":
            await subMenuContratos();
            console.log("submenu contratos")
            break
        case "5":
            await subMenuGestion();
            break
        case "6":
            salir = true;
            console.log("Saliendo...")
            break
        default:
            break;
    }
}

//-------------------submenús--------------------------


//===================================================
//                       CLIENTES
//===================================================
async function subMenuClientes() {
    const { opcionCliente } = await preguntarOpcion([
        {
            type: "list",
            name:"opcionCliente",
            message:"Selecciona una opción: ",
            choices: [
                {name: "Crear cliente", value: "1"},
                {name: "Editar cliente", value: "2"},
                {name: "Eliminar cliente", value: "3"},
                {name: "Buscar cliente", value: "4"},
                {name: "Listar cliente", value: "5"},
                {name: "Añadir plan", value: "5"},
                {name: "Regresar al menú anterior", value: "6"}
            ]
        }
    ]);

    switch (opcionCliente) {
        case "1":
            console.log("agregar cliente")
            break;
        case "2":
            console.log("editar cliente")
            break;
        case "3":
            console.log("eliminar cliente")
            break;
        case "4":
            console.log("buscar cliente")
            break;
        case "5":
            console.log("listar cliente")
            break;
        case "6":
            console.log("añadir plan")
            break;
        case "7":
            console.log("regresar al menu anterior")
            break;
        default:
            break;
    }
};

//===================================================
//                       PLANES
//===================================================

async function subMenuPlanes() {
    const { opcionPlanes } = await preguntarOpcion([
        {
            type: "list",
            name: "opcionPlanes",
            message: "Seleccione una opción",
            choices: [
                {name: "Crear plan de entrenamiento", value: "1"},
                {name: "Editar un plan de entrenamiento", value: "2"},
                {name: "Eliminar un plan de entrenamiento", value: "3"},
                {name: "Listar los planes de entrenamiento", value: "4"},
                {name: "Regresar al menú anterior", value: "5"},
            ]
        }
    ]);

    switch (opcionPlanes) {
        case "1":
            console.log("crear plan")
            break;
        case "2":
            console.log("editar plan")
            break;
        case "3":
            console.log("eliminar plan")
            break;
        case "4":
            console.log("listar planes")
            break;
        case "5":
            console.log("regresar al menu anterior")
            break;
        default:
            break;
    }
    
};

//===================================================
//                      SEGUIMIENTO
//===================================================

async function subMenuSeguimiento() {
    const { opcionSeguimiento } = await preguntarOpcion([
        {
            type: "list",
            name: "opcionSeguimiento",
            message: "Selecciona una opción: ",
            choices: [
                {name: "Registrar avance", value: "1"},
                {name: "Eliminar Avance", value: "2"},
                {name: "Ver avance de un cliente", value: "3"},
                {name: "Regresar al menú anterior", value: "4"}
            ]
        }
    ]);

    switch (opcionSeguimiento) {
        case "1":
            console.log("registri de avance")
            break;
        case "2":
            console.log("eliminar avnace")
            break;
        case "3":
            console.log("ver avance cliente")
            break;
        case "4":
            console.log("regresar al menu anterior")
            break;
        default:
            break;
    }
    
};

//===================================================
//                      CONTRATOS
//===================================================

async function subMenuContratos() {
    const { opcionContratos } = await preguntarOpcion([
        {
            type: "list",
            name: "opcionContratos",
            message: "Seleccione una opción",
            choices: [
                {name: "Crear contrato", value: "1"},
                {name: "Finalizar contrato", value: "2"},
                {name: "Ver contratos", value: "3"},
                {name: "Regresar al menú anterior", value: "4"}
            ]
        }
    ]);

    switch (opcionContratos) {
        case "1":
            console.log("creacion contrato")
            break;
        case "2":
            console.log("finalizar contrato")
            break;
        case "3":
            console.log("ver contratos")
            break;
        case "4":
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
    const { opcionGestion } = await preguntarOpcion([
        {
            type: "list",
            name: "opcionGestion",
            message: "Seleccione una opción: ",
            choices: [
                {name: "Crear Ingreso", value: "1"},
                {name: "Crear Egreso", value: "2"},
                {name: "Ver historial de ingresos", value: "3"},
                {name: "Ver historial de egresos", value: "4"},
                {name: "Balance por clientes", value: "5"},
                {name: "Balance general", value: "6"},
                {name: "Volver al menu anterior", value: "7"},
            ]
        }
    ]);

    switch (opcionGestion) {
        case "1":
            console.log("creacion de ingreso")
            break;
        case "2":
            console.log("creacion de egreso")
            break;
        case "3":
            console.log("ver historial ingre")
            break;
        case "4":
            console.log("ver historial egre")
            break;
        case "5":
            console.log("balance clientes")
            break;
        case "6":
            console.log("balance general")
            break;
        case "7":
            console.log("regresal al menu ante")
            break;
        default:
            break;
    }
};