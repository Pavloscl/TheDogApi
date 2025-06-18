// Importar el repositorio de correos
const encryptionRepository = require('../../repositories/encryp/encryptionRepository'); // Repositorio de encriptación

/**
 * Encripta un texto utilizando el repositorio de encriptación.
 * 
 * @function encriptar
 * @param {string} texto - Texto a encriptar.
 * @returns {Object} Objeto con el texto encriptado y el vector de inicialización (IV).
 */
exports.encriptarTexto = (texto) => {
    return encryptionRepository.encriptarTexto(texto);
};

/**
 * Desencriptar un texto utilizando el repositorio de encriptación.
 * 
 * @function encriptar
 * @param {string} encrypted - Texto a desencriptar.
 * @param {string} iv - Vector de inicialización utilizado durante la encriptación.
 * @returns {Object} Objeto con el texto encriptado y el vector de inicialización (IV).
 */
exports.desencriptarTexto = (encrypted, iv) => {
    return encryptionRepository.desencriptarTexto(encrypted, iv);
};