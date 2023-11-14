import { Personaje } from './personaje.js';

export class Monstruo extends Personaje {
  constructor(id, nombre, tipo, alias,  miedo, defensa, poderes = {}) {
    super(id, nombre, tipo);
    this.alias = alias;
    this.miedo = miedo;
    this.defensa = defensa;
    this.poderes = {
      volador: poderes.volador || false,
      inmortalidad: poderes.inmortalidad || false,
      invisibilidad: poderes.invisibilidad || false,
      supervelocidad: poderes.supervelocidad || false,
    };
  }
}