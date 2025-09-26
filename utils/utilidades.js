import inquirer from 'inquirer';

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function preguntar(mensaje) {
    const respuesta = await inquirer.prompt([
        {
            type: 'input',
            name: 'valor',
            message: mensaje
        }
    ]);
    return respuesta.valor;
}

export async function preguntarNum(mensaje) {
    const respuesta = await inquirer.prompt([
        {
            type: 'input',
            name: 'valor',
            message: mensaje,
            validate: (input) => {
                const num = Number(input);
                return !isNaN(num) || 'Debes ingresar un número válido';
            }
        }
    ]);
    return Number(respuesta.valor);
}

export async function opcion(...opciones) {
    const respuesta = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: chalk.yellow('Elige una opción:'),
            choices: opciones
        }
    ]);
    return respuesta.opcion;
}