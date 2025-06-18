const repo = require('../../repositories/tareas/tareasRepository');
const Tarea = require('../../models/tareas/tareaModel');

/**
 * Obtiene todas las tareas almacenadas.
 * @returns {Promise<Tarea[]>} Lista de tareas.
 */
async function obtenerTodas() {
  return await repo.obtenerTodas();
}

/**
 * Crea una nueva tarea.
 * @param {{id: number|string, titulo: string, completada?: boolean}} param0 - Datos de la tarea.
 * @returns {Promise<Tarea>} La tarea creada.
 */
async function crear({ id, titulo, completada }) {
  const nueva = new Tarea(id, titulo, completada);
  return await repo.crear(nueva);
}

/**
 * Crea una nueva tarea con id autoincremental.
 * @param {{id: number, titulo: string, completada?: boolean}} param0 - Datos de la tarea.
 * @returns {Promise<Tarea>} La tarea creada.
 */
async function crearAutoId({ id, titulo, completada }) {
  const nueva = new Tarea(id++, titulo, completada);
  return await repo.crear(nueva);
}

/**
 * Actualiza una tarea existente.
 * @param {number|string} id - Identificador de la tarea.
 * @param {Object} datos - Datos a actualizar.
 * @returns {Promise<Tarea|null>} La tarea actualizada o null si no existe.
 */
async function actualizar(id, datos) {
  return await repo.actualizar(id, datos);
}

/**
 * Elimina una tarea por su id.
 * @param {number|string} id - Identificador de la tarea.
 * @returns {Promise<boolean>} True si se eliminó, false si no existe.
 */
async function eliminar(id) {
  return await repo.eliminar(id);
}

module.exports = {
  obtenerTodas,
  crear,
  crearAutoId,
  actualizar,
  eliminar
};