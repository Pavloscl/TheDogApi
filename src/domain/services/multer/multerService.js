// Importar el repositorio de nutrición
const multerRepository = require('../../repositories/multer/multerRepository');

/**
 * @file Servicio para manejar la lógica de negocio relacionada con la subida de archivos.
 * 
 * @module multerService
 */

/**
 * Guarda un archivo utilizando el repositorio de subida de archivos.
 * 
 * @function guardarArchivo
 * @param {Object} archivo - Archivo cargado por el cliente.
 * @returns {Promise<void>}
 */
exports.guardarArchivo = (archivo) => {
  return multerRepository.guardarArchivo(archivo);
};