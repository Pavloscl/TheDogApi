// Importación de módulos y configuraciones necesarias
const sgMail = require('@sendgrid/mail'); // Cliente de SendGrid para el envío de correos electrónicos
const config = require('../../../config/config'); // Configuración personalizada del proyecto
const logger = require('../../logger'); // Logger personalizado para registrar eventos

/**
 * @file Configuración y funcionalidad para el envío de correos electrónicos utilizando SendGrid.
 * Este módulo gestiona el envío de correos electrónicos a través de la API de SendGrid,
 * configurando el entorno, las claves de API y las configuraciones necesarias para
 * garantizar la seguridad en la comunicación.
 * 
 * @module emailService
 */

/**
 * Configura la API Key de SendGrid utilizando la variable de entorno correspondiente.
 * Establece la clave API de SendGrid para permitir el envío de correos electrónicos a través de la
 * plataforma de SendGrid. La clave debe estar configurada en las variables de entorno.
 */
sgMail.setApiKey(config.sendgridApiKey);

/**
 * Función genérica para enviar correos electrónicos utilizando SendGrid.
 * 
 * Esta función permite enviar correos electrónicos a una dirección especificada, con un asunto
 * y contenido en texto plano, y opcionalmente en formato HTML.
 * 
 * @async
 * @function sendEmail
 * @param {string} to - Dirección de correo electrónico del receptor.
 * @param {string} subject - Asunto del correo electrónico.
 * @param {string} text - Contenido del correo en formato de texto plano.
 * @param {string|null} [html=null] - Contenido del correo en formato HTML (opcional).
 * 
 * @returns {Promise<void>} 
 * 
 * @throws {Error} Si ocurre un error durante el envío del correo.
 * 
 * @example
 * sendEmail('example@example.com', 'Asunto del correo', 'Texto del correo', '<p>Texto en HTML</p>');
 */
const sendEmail = async (to, subject, text, html = null) => {
  const msg = {
    to, // Receptor del correo
    from: config.sendgridFromEmail, // Dirección de envío (debe estar verificada en SendGrid)
    subject, // Asunto del correo
    text, // Contenido del correo en texto plano
    html, // Si deseas enviar contenido HTML
  };

  try {
    // Enviar el correo utilizando la API de SendGrid
    await sgMail.send(msg);
    logger.info(`Correo enviado exitosamente a: ${to}`);
  } catch (error) {
    // Capturar y loguear cualquier error que ocurra durante el envío del correo
    logger.error('❌ Error al enviar correo:', error);
    if (error.response) {
      logger.error('Detalles del error:', error.response.body);
    }
    throw error; // Relanzar el error para que pueda ser manejado por el llamador
  }
};

/**
 * Exporta la función `sendEmail` para su uso en otras partes de la aplicación.
 * 
 * Este módulo permite enviar correos electrónicos de manera sencilla y reutilizable
 * en cualquier parte del proyecto.
 * 
 * @module emailService
 */
module.exports = { sendEmail };