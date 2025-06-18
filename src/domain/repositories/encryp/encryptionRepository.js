// Importación de dependencias necesarias
const { encriptar, desencriptar } = require('../../../shared/crypto'); // Logger personalizado para registrar eventos
const logger = require('../../../infrastructure/logger'); // Logger personalizado para registrar eventos

/**
 * Encripta un texto utilizando el algoritmo AES-256-CBC.
 * 
 * @function encriptarTexto
 * @param {string} texto - Texto a encriptar.
 * @returns {Object} Objeto con el texto encriptado y el vector de inicialización (IV).
 * 
 * @throws {Error} Si ocurre un error durante la encriptación.
 */
exports.encriptarTexto = (texto) => {
    try {
      const { encrypted, iv } = encriptar(texto); // Llamada al método de encriptación
      logger.info('Texto encriptado exitosamente.');
      return { encrypted, iv };
    } catch (error) {
      logger.error(`Error al encriptar: ${error.message}`);
      throw new Error('No se pudo encriptar el texto.');
    }
  };

  /**
 * Desencripta un texto utilizando el algoritmo AES-256-CBC.
 * 
 * @function desencriptarTexto
 * @param {string} encrypted - Texto encriptado.
 * @param {string} iv - Vector de inicialización utilizado durante la encriptación.
 * @returns {string} Texto desencriptado.
 * 
 * @throws {Error} Si ocurre un error durante la desencriptación.
 */
exports.desencriptarTexto = (encrypted, iv) => {
  try {
      const textoDesencriptado = desencriptar(encrypted, iv); // Llamada al método de desencriptación
      logger.info('Texto desencriptado exitosamente.');
      return textoDesencriptado;
  } catch (error) {
      logger.error(`Error al desencriptar: ${error.message}`);
      throw new Error('No se pudo desencriptar el texto.');
  }
};