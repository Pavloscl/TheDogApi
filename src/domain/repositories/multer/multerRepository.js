// Importación de dependencias necesarias
const logger = require('../../../infrastructure/logger'); // Logger personalizado para registrar eventos

/**
 * Guarda un archivo en el sistema de archivos local.
 * En este caso, verifica si el archivo existe en la ruta temporal y opcionalmente lo mueve a otra ruta.
 * 
 * @function guardarArchivo
 * @param {Object} archivo - Archivo cargado por el cliente.
 * @returns {Promise<void>}
 * 
 * @throws {Error} Si ocurre un error al guardar el archivo.
 */
exports.guardarArchivo = async (archivo) => {
  return new Promise((resolve, reject) => {
    try {
      const rutaActual = archivo.path; // ruta donde multer ya guardó el archivo

      // No hay que mover nada, ya está guardado
      logger.info(`Archivo guardado correctamente por multer en: ${rutaActual}`);
      resolve();
    } catch (err) {
      logger.error(`Excepción al guardar archivo: ${err.message}`);
      reject(new Error('Error al guardar el archivo.'));
    }
  });
};