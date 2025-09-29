
import { conectar, obtenerBase, obtenerCliente, cerrarConexion } from './config/db_conection.js';
import {menuPrincipal} from "../cli/menuPrincipal.js"; 
const uri = "mongodb+srv://edgar:1852467@cluster0.nw7rq1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
try {
  await conectar(uri, "ignasio");
  const base = obtenerBase();
  const cliente = obtenerCliente();
  await menuPrincipal(base,cliente);

} catch (error) {
  console.error("Error en la aplicación:", error);
} finally {
  await cerrarConexion();
  console.log("Conexión a la base de datos cerrada.");
}