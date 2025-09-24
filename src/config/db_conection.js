import { MongoClient } from "mongodb";

let cliente;
let base;

export async function conectar(uri, nombreBD = "pizza_y_punto") {
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

