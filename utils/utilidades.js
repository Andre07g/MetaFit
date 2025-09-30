    import inquirer from 'inquirer';
    import chalk from 'chalk';

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

    export async function opciones(...opciones) {
        const respuesta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: 'Elige una opción:',
                choices: opciones
            }
        ]);
        return respuesta.opcion;
    }

export    async function mostrarInicio() {
  const ascii = `
███╗   ███╗███████╗████████╗ █████╗ ███████╗██╗████████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║╚══██╔══╝
██╔████╔██║█████╗     ██║   ███████║█████╗  ██║   ██║   
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══╝  ██║   ██║   
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║     ██║   ██║   
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝   
                                                        
  `;

  console.log(chalk.yellow(ascii));
  await sleep(2500);
  console.clear();           
}