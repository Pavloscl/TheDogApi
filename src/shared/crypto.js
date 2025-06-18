const crypto = require('crypto');
const logger = require('../infrastructure/logger'); // Logger personalizado para registrar eventos
const config = require('../config/config'); // Configuración personalizada del proyecto
const { sanitize } = require('express-xss-sanitizer'); // Librería para sanitizar entradas y prevenir XSS

/**
 * Encripta un texto utilizando el algoritmo AES-256-CBC.
 * 
 * @function encriptar
 * @param {string} texto - Texto a encriptar.
 * @returns {Object} Objeto con el texto encriptado y el vector de inicialización (IV).
 * 
 * @throws {Error} Si ocurre un error durante la encriptación.
 */
const encriptar = (texto) => {
  try {
    const textoSanitizado = sanitize(texto);
    const iv = crypto.randomBytes(16); // Generar un vector de inicialización (IV)
    const key = crypto.createHash('sha256').update(config.encryption_key).digest(); // Generar clave a partir de la ENV
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(textoSanitizado, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    logger.info('Texto se esta encriptado.');
    return { encrypted, iv: iv.toString('hex') };
  } catch (error) {
    logger.error(`Error al encriptar: ${error.message}`);
    throw new Error('No se pudo encriptar el texto.');
  }
};

/**
 * Desencripta un texto utilizando el algoritmo AES-256-CBC.
 * 
 * @function desencriptar
 * @param {string} encrypted - Texto encriptado.
 * @param {string} iv - Vector de inicialización utilizado durante la encriptación.
 * @returns {string} Texto desencriptado.
 * 
 * @throws {Error} Si ocurre un error durante la desencriptación.
 */
const desencriptar = (encrypted, iv) => {
  try {
    const key = crypto.createHash('sha256').update(config.encryption_key).digest(); // Generar clave a partir de la ENV
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    logger.info('Texto desencriptado exitosamente.');
    // Sanitizar el texto desencriptado
    const decryptedSanitizado = sanitize(decrypted);
    return decryptedSanitizado;
  } catch (error) {
    logger.error(`Error al desencriptar: ${error.message}`);
    throw new Error('No se pudo desencriptar el texto.');
  }
};

/**
 * Exportar las funciones de encriptación y desencriptación para ser utilizadas en otros módulos.
 *
 * @exports encriptar
 * @exports desencriptar
 */
module.exports = { encriptar, desencriptar };