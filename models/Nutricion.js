export default class Nutricion{
    constructor(nombre, desayuno = [], almuerzo = [], cena = [],plan) {
    this.desayuno = desayuno;
    this.almuerzo = almuerzo;
    this.cena = cena;
    this.nombre=nombre;
    this.planId=plan._id
}
}

