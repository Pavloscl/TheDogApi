const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../../../config/data/tareas.json');

/**
 * Lee el archivo de tareas y retorna su contenido como objeto.
 * @returns {Promise<Array>} Lista de tareas.
 */
async function leerArchivo() {
  const contenido = await fs.readFile(filePath, 'utf8');
  return JSON.parse(contenido);
}

/**
 * Guarda la lista de tareas en el archivo.
 * @param {Array} data - Lista de tareas a guardar.
 * @returns {Promise<void>}
 */
async function guardarArchivo(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

/**
 * Obtiene todas las tareas.
 * @returns {Promise<Array>} Lista de tareas.
 */
async function obtenerTodas() {
  return await leerArchivo();
}

/**
 * Crea una nueva tarea y la guarda.
 * @param {Object} tarea - Tarea a crear.
 * @returns {Promise<Object>} La tarea creada.
 */
async function crear(tarea) {
  const tareas = await leerArchivo();
  tareas.push(tarea);
  await guardarArchivo(tareas);
  return tarea;
}

/**
 * Actualiza una tarea existente por su id.
 * @param {number|string} id - Identificador de la tarea.
 * @param {Object} data - Datos a actualizar.
 * @returns {Promise<Object|null>} La tarea actualizada o null si no existe.
 */
async function actualizar(id, data) {
  const tareas = await leerArchivo();
  const index = tareas.findIndex(t => t.id === parseInt(id));
  if (index === -1) return null;

  tareas[index] = { ...tareas[index], ...data };
  await guardarArchivo(tareas);
  return tareas[index];
}

/**
 * Elimina una tarea por su id.
 * @param {number|string} id - Identificador de la tarea.
 * @returns {Promise<boolean>} True si se eliminó, false si no existe.
 */
async function eliminar(id) {
  const tareas = await leerArchivo();
  const index = tareas.findIndex(t => t.id === parseInt(id));
  if (index === -1) return false;

  tareas.splice(index, 1);
  await guardarArchivo(tareas);
  return true;
}

module.exports = {
  obtenerTodas,
  crear,
  actualizar,
  eliminar
};