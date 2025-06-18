/**
 * Clase que representa una tarea.
 */
class Tarea {
  /**
   * Crea una nueva tarea.
   * @param {number|string} id - Identificador único de la tarea.
   * @param {string} titulo - Título o descripción de la tarea.
   * @param {boolean} [completada=false] - Estado de la tarea (completada o no).
   */
  constructor(id, titulo, completada = false) {
    this.id = id;
    this.titulo = titulo;
    this.completada = completada;
  }

  /**
   * Marca la tarea como completada.
   */
  completar() {
    this.completada = true;
  }

  /**
   * Marca la tarea como no completada.
   */
  descompletar() {
    this.completada = false;
  }
}

module.exports = Tarea;