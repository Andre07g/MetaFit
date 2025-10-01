import {ObjectId} from "mongodb"

export default class GestionFinancieraRepositorio{
    constructor(base){
        this.coleccion=base.collection("movimientos")
    }

    async crear(movimiento){
        return await this.coleccion.insertOne(movimiento)
    }

    async listar(){
        return await this.coleccion.find().toArray();
    }

    async eliminar(movimiento){
        return await this.coleccion.deleteOne({_id:new ObjectId(movimiento._id)});
    }

    async listarPorTipo(tipo){
        return await this.coleccion.find({tipo:tipo}).toArray()
    }

    async listarPorCliente (id){
        return await this.coleccion.find({clienteID: new ObjectId(id)}).toArray()
    }

    async calcularBalance() {
        const resultado = await this.coleccion.aggregate([
            {
                $group: {
                    _id: "$tipo",
                    total: { $sum: "$pago" }
                }
            },
            {
                $group: {
                    _id: null,
                    ingresos: {
                        $sum: {
                            $cond: [{ $eq: ["$_id", "Ingreso"] }, "$total", 0]
                        }
                    },
                    egresos: {
                        $sum: {
                            $cond: [{ $eq: ["$_id", "Egreso"] }, "$total", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    ingresos: 1,
                    egresos: 1,
                    balance: { $subtract: ["$ingresos", "$egresos"] }
                }
            }
        ]).toArray();

        return resultado[0] || { ingresos: 0, egresos: 0, balance: 0 };
    }

    async calcularBalanceMes (mes){
        const resultado = await this.coleccion.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{$month: '$fecha'}, mes]
                    }
                } 
            },{
                $group: {
                    _id: "$tipo",
                    total: { $sum: "$pago" }
                }
            },
            {
                $group: {
                    _id: null,
                    ingresos: {
                        $sum: {
                            $cond: [{ $eq: ["$_id", "Ingreso"] }, "$total", 0]
                        }
                    },
                    egresos: {
                        $sum: {
                            $cond: [{ $eq: ["$_id", "Egreso"] }, "$total", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    ingresos: 1,
                    egresos: 1,
                    balance: { $subtract: ["$ingresos", "$egresos"] }
                }
            }
           
        ]).toArray();
        return resultado[0] || { ingresos: 0, egresos: 0, balance: 0 };
    }
    
    async calcularBalanceAnio (anio){
        const resultado = await this.coleccion.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{$year: '$fecha'}, anio]
                    }
                } 
            },{
                $group: {
                    _id: "$tipo",
                    total: { $sum: "$pago" }
                }
            },
            {
                $group: {
                    _id: null,
                    ingresos: {
                        $sum: {
                            $cond: [{ $eq: ["$_id", "Ingreso"] }, "$total", 0]
                        }
                    },
                    egresos: {
                        $sum: {
                            $cond: [{ $eq: ["$_id", "Egreso"] }, "$total", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    ingresos: 1,
                    egresos: 1,
                    balance: { $subtract: ["$ingresos", "$egresos"] }
                }
            }
           
        ]).toArray();
        return resultado[0] || { ingresos: 0, egresos: 0, balance: 0 };
    }
}




