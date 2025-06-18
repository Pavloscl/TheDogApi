// Importación de dependencias necesarias
const logger = require('../../../infrastructure/logger'); // Logger personalizado para registrar eventos
const { sendEmail } = require('../../../infrastructure/external/sendgrid/sendgrid'); // Configuración para el envío de correos electrónicos a través de SendGrid

/**
 * Envía un correo electrónico utilizando SendGrid.
 * 
 * @async
 * @function enviarCorreo
 * @param {Object} correo - Detalles del correo a enviar.
 * @param {string} correo.to - Dirección de correo del destinatario.
 * @param {string} correo.subject - Asunto del correo.
 * @param {string} correo.text - Contenido del correo en texto plano.
 * @param {string} [correo.html] - Contenido del correo en formato HTML (opcional).
 * @returns {Promise<void>}
 * 
 * @throws {Error} Si ocurre un error al enviar el correo.
 */
exports.enviarCorreo = async (correo) => {
    try {
        await sendEmail(correo.to, correo.subject, correo.text, correo.html);
        logger.info(`Correo enviado exitosamente a ${correo.to}`);
    } catch (error) {
        logger.error(`Error al enviar correo: ${error.message}`);
        throw new Error('No se pudo enviar el correo.');
    }
};