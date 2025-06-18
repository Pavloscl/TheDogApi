// Importación de módulos y configuraciones necesarias
const encryptionService = require('../../domain/services/encryp/encryptionService'); // Servicio de encriptación para invocar métodos de encriptación
const logger = require('../../infrastructure/logger'); // Logger personalizado para registrar eventos
const httpMessages = require('../../shared/messages/http'); // Mensajes estándar HTTP

/**
 * @file Controlador para gestionar los endpoints relacionados en la encriptación de datos.
 * 
 * @module encryptionController
 */

/**
 * @swagger
 * tags:
 *   - name: Encriptación de Datos con protección XSS
 *     description: Endpoints para la encriptación y desencriptación de datos.
 */

/**
 * @swagger
 * /Encriptar:
 *   post:
 *     summary: Encriptar un texto
 *     description: Encripta un texto utilizando el algoritmo AES-256-CBC.
 *     tags: [Encriptación de Datos con protección XSS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: Texto a encriptar.
 *                 example: "Texto de ejemplo"
 *     responses:
 *       200:
 *         description: Texto encriptado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 encrypted:
 *                   type: string
 *                   description: Texto encriptado.
 *                   example: "5d41402abc4b2a76b9719d911017c592"
 *                 iv:
 *                   type: string
 *                   description: Vector de inicialización utilizado.
 *                   example: "1a2b3c4d5e6f7g8h9i0j"
 *       500:
 *         description: Error al encriptar el texto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo encriptar el texto."
 */

/**
 * Controlador para encriptar un texto.
 * 
 * @function encriptar
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
exports.encriptarTexto = (req, res) => {
  try {
    const { texto } = req.body;
    const resultado = encryptionService.encriptarTexto(texto);
    res.status(200).json(resultado);
  } catch (error) {
    logger.error('Error al encriptarTexto:', error);
    res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
  }
};

/**
 * @swagger
 * /Desencriptar:
 *   post:
 *     summary: Desencriptar un texto
 *     description: Desencripta un texto previamente encriptado utilizando el algoritmo AES-256-CBC.
 *     tags: [Encriptación de Datos con protección XSS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               encrypted:
 *                 type: string
 *                 description: Texto encriptado que se desea desencriptar.
 *                 example: "5d41402abc4b2a76b9719d911017c592"
 *               iv:
 *                 type: string
 *                 description: Vector de inicialización utilizado durante la encriptación.
 *                 example: "1a2b3c4d5e6f7g8h9i0j"
 *     responses:
 *       200:
 *         description: Texto desencriptado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textoDesencriptado:
 *                   type: string
 *                   description: Texto desencriptado.
 *                   example: "Texto de ejemplo"
 *       400:
 *         description: Los campos "encrypted" e "iv" son requeridos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Los campos 'encrypted' e 'iv' son requeridos."
 *       500:
 *         description: Error al desencriptar el texto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo desencriptar el texto."
 */
exports.desencriptarTexto = (req, res) => {
  try {
      const { encrypted, iv } = req.body;

      if (!encrypted || !iv) {
          return res.status(400).json({ message: httpMessages.BAD_REQUEST });
      }

      const textoDesencriptado = encryptionService.desencriptarTexto(encrypted, iv);
      res.status(200).json({ textoDesencriptado });
  } catch (error) {
      logger.error('Error al desencriptarTexto:', error);
      res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
  }
};