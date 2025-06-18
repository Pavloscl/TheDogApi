// Importar el repositorio de correos
const emailRepository = require('../../repositories/email/emailRepository'); // Repositorio de correos

/**
 * Envía un correo electrónico utilizando el repositorio de correos.
 * 
 * @async
 * @function enviarCorreo
 * @param {Object} correo - Detalles del correo a enviar.
 * @returns {Promise<void>}
 */
exports.enviarCorreo = async (correo) => {
    return await emailRepository.enviarCorreo(correo);
};