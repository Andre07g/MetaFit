import dotenv from "dotenv";
dotenv.config();
import { conectar, obtenerBase, obtenerCliente, cerrarConexion } from './config/db_conection.js';
import {menuPrincipal} from "../cli/menuPrincipal.js";
import {sleep,preguntar } from "../utils/utilidades.js" 
import chalk from "chalk";
const uri = "mongodb://localhost:27017";
const claveAdmin = process.env.CLAVE;
try {
  await conectar(uri, "MetaFit");
  const base = obtenerBase();
  const cliente = obtenerCliente();
  await sleep(1000);
  console.clear()
  let contraseña=await preguntar ("Ingrese la contraseña");
  if(contraseña==claveAdmin){console.log("Contraseña correcta");await sleep(1000);await menuPrincipal(base,cliente);}
  else{console.log(chalk.redBright("Contraseña incorrecta"));await sleep(1000);console.clear()}
} catch (error) {
  console.error("Error en la aplicación:", error);
} finally {
  await cerrarConexion();
  console.log("Conexión a la base de datos cerrada.");
}