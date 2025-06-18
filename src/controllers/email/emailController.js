// Importación de módulos y configuraciones necesarias
const emailService = require('../../domain/services/email/emailService'); // Servicio de SendGrid
const logger = require('../../infrastructure/logger'); // Logger personalizado para registrar eventos
const httpMessages = require('../../shared/messages/http'); // Mensajes estándar HTTP

/**
 * @file Controlador para gestionar los endpoints relacionados con envios de correo.
 * Este archivo define las funciones que manejan las solicitudes HTTP relacionadas
 * a envios de correos.
 * 
 * @module emailController
 */

/**
 * @swagger
 * tags:
 *   - name: Envío de Correos con SendGrid
 *     description: Endpoints para el envío de correos electrónicos utilizando SendGrid.
 */

/**
 * @swagger
 * /SendEmail:
 *   post:
 *     summary: Enviar un correo electrónico
 *     description: Envía un correo electrónico utilizando la API de SendGrid.
 *     tags: [Envío de Correos con SendGrid]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: Dirección de correo del destinatario.
 *                 example: example@example.com
 *               subject:
 *                 type: string
 *                 description: Asunto del correo.
 *                 example: Asunto del correo
 *               text:
 *                 type: string
 *                 description: Contenido del correo en texto plano.
 *                 example: Texto del correo
 *               html:
 *                 type: string
 *                 description: Contenido del correo en formato HTML (opcional).
 *                 example: <p>Texto en HTML</p>
 *     responses:
 *       200:
 *         description: Correo enviado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Correo enviado exitosamente.
 *       500:
 *         description: Error al enviar el correo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pudo enviar el correo.
 */

/**
 * Controlador para enviar un correo electrónico.
 * 
 * @async
 * @function enviarCorreo
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
exports.enviarCorreo = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    await emailService.enviarCorreo({ to, subject, text, html });
    res.status(200).json({ message: httpMessages.OK });
  } catch (error) {
    logger.error('Error al enviarCorreo:', error);
    res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
  }
};