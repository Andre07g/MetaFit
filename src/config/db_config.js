    db.createCollection("clientes", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["nombre", "documento", "telefono", "planes"],
                properties: {
                    nombre: {
                        bsonType: "string",
                        description: "Nombre completo del cliente",
                        minLength: 3
                    },
                    documento: {
                        bsonType: "string",
                        description: "Documento del cliente",
                        pattern: "^\\d{10}$"
                    },
                    telefono: {
                        bsonType: "string",
                        description: "Numero telefonico",
                        pattern: "^\\+57\\d{10}$"
                    }, planes: {
                        bsonType: "array",
                        description: "Lista de planes activos del usuario",
                        items: {
                            bsonType: "objectId",
                            description: "Referencia a un plan mediante su Id"
                        }
                    }

                }
            }
        }
    })

    db.createCollection("planes", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["nombre", "duracion", "meta_fisica", "nivel"],
                properties: {
                    nombre: {
                        bsonType: "string",
                        description: "Nombre del plan",
                        minLength: 3
                    },
                    meta_fisica: {
                        bsonType: "string",
                        description: "Objetivo final a alcanzar con el plan de entrenamiento",
                        enum:["Bajar de peso","Aumentar masa muscular","Mejorar rendimiento","Mejorar fuerza","Mejorar elasticidad"]
                        
                    }, 
                    nivel: {
                        bsonType: "string",
                        description: "Nivel de dificultad o esfuerzo del plan",
                        enum:["Principiante","Intermedio","Avanzado"]
                        
                    }

                }
            }
        }
    })

    db.createCollection("seguimiento", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["clienteId","peso_actual","porcentaje_de_grasa","medidas","comentarios"],
                properties: {
                    clienteID: {
                        bsonType: "objectId",
                        description: "Referencia al cliente mediante su id unico",
                    },
                    peso_actual: {
                        bsonType: "double",
                        description: "Peso actual del cliente",
                    },
                    porcentaje_de_grasa: {
                        bsonType: "int",
                        description: "Porcentaje de grasa tomado del cliente del 1 al 100",
                        minimum:1,
                        maximum:100
                    },
                    medidas: {
                        bsonType: "array",
                        description: "Medidas del cliente al momento de realizar el histórico",
                        items: {
                            bsonType: "object",
                            required: ["parte", "valor"],
                            properties: {
                                parte: {
                                    bsonType: "string",
                                    enum: ["pierna", "brazo", "cintura", "pecho"],
                                    description: "Parte del cuerpo medida"
                                },
                                valor: {
                                    bsonType: "double",
                                    minimum: 0,
                                    description: "Valor numérico de la medida"
                                }
                            },
                            additionalProperties: false
                        }
                    },  
                    comentarios: {
                        bsonType: "string",
                        description: "Comentarios del avance, maximo 300 caracteres",
                        maxLength:300
                    }

                }
            }
        }
    })

    db.createCollection("nutricion", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["nombre","desayuno","almuerzo","cena","planId"],
                properties: {
                    nombre:{bsonType:"string",description:"Nombre del plan de nutricion",minLength:5},
                    desayuno: {
                        bsonType: "array",
                        description: "Desayunos recomendados al cliente",
                        items: {
                            bsonType: "object",
                            required: ["nombre", "calorias"],
                            properties: {
                                parte: {
                                    bsonType: "string",
                                    description: "Nombre del alimento"
                                },
                                valor: {
                                    bsonType: "double",
                                    minimum: 0,
                                    description: "Calorias aproximadas por comida"
                                }
                            },
                            additionalProperties: false
                        }
                    },  
                    almuerzo: {
                        bsonType: "array",
                        description: "Almuerzos recomendados al cliente",
                        items: {
                            bsonType: "object",
                            required: ["nombre", "calorias"],
                            properties: {
                                parte: {
                                    bsonType: "string",
                                    description: "Nombre del alimento"
                                },
                                valor: {
                                    bsonType: "double",
                                    minimum: 0,
                                    description: "Calorias aproximadas por comida"
                                }
                            },
                            additionalProperties: false
                        }
                    }, 
                    cema: {
                        bsonType: "array",
                        description: "Cenas recomendados al cliente",
                        items: {
                            bsonType: "object",
                            required: ["nombre", "calorias"],
                            properties: {
                                parte: {
                                    bsonType: "string",
                                    description: "Nombre del alimento"
                                },
                                valor: {
                                    bsonType: "double",
                                    minimum: 0,
                                    description: "Calorias aproximadas por comida"
                                }
                            },
                            additionalProperties: false
                        }
                    }, 
                    clienteId:{
                        bsonType:"objectId",
                        description:"Referencia al cliente al que esta ligado este plan nutricional"
                    }

                }
            }
        }
    })

    db.createCollection("contratos", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["clienteNombre","clienteId","planNombre","planId","duracion","precio","fechaInicio","fechaFinalizacion"],
                properties: {
                    clienteNombre:{
                        bsonType:"string",
                        description:"Nombre completo del cliente a la hora de realizar el contrato"
                    },
                    clienteId:{
                        bsonType:"objectId",
                        description:"Referencia al cliente que adquiere el plan mediante su id"
                    },
                    planNombre:{
                        bsonType:"string",
                        description:"Nombre del plan que será adquirido por el cliente a la hora de realizar el contrato",
                    },
                    planId:{
                        bsonType:"objectId",
                        description:"Referencia al plan que será adquirido mediante su id"
                    },
                    duracion:{
                        bsonType:"int",
                        description:"Duración del contrato en dias",
                        minimum:30
                    },
                    precio:{
                        bsonType:"int",
                        description:"Precio del contrato",
                    },
                    fechaInicio:{
                        bsonType:"date",
                        description:"Fecha en la que se inicio el contrato"
                    },
                    fechaFinalizacion:{
                        bsonType:["date","null"],
                        description:"Fecha en la que finalizó el contrato"
                    }

                }
            }
        }
    })

    db.createCollection("movimientos", {
        validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["tipo", "pago", "fecha"],
            properties: {
            tipo: {
                bsonType: "string",
                enum: ["Ingreso", "Egreso"],
                description: "Tipo de movimiento financiero"
            },
            pago: {
                bsonType: "double",
                minimum: 0,
                description: "Monto del movimiento financiero"
            },
            fecha: {
                bsonType: ["date", "null"],
                description: "Fecha del movimiento"
            },
    
            clienteID: {
                bsonType: ["objectId", "null"],
                description: "ID del cliente (solo para ingresos)"
            },
            clienteNombre: {
                bsonType: ["string", "null"],
                description: "Nombre del cliente (solo para ingresos)",
                minLength: 1
            },
            planID: {
                bsonType: ["objectId", "null"],
                description: "ID del plan (solo para ingresos)"
            },
            planNombre: {
                bsonType: ["string", "null"],
                description: "Nombre del plan (solo para ingresos)",
                minLength: 1
            },
    
            concepto: {
                bsonType: ["string", "null"],
                description: "Concepto del egreso"
            },
            descripcion: {
                bsonType: ["string", "null"],
                description: "Descripción del egreso"
            }
            }
        }
        }
    });
    