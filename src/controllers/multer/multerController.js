// Importación de módulos y configuraciones necesarias
const multerService = require('../../domain/services/multer/multerService');
const logger = require('../../infrastructure/logger'); // Asegúrate de que el logger venga de tu módulo local
const httpMessages = require('../../shared/messages/http'); // Mensajes estándar HTTP

/**
 * @file Controlador para gestionar los endpoints relacionados con la subida de archivos.
 * @module multerController
 */

/**
 * @swagger
 * tags:
 *   - name: Subida de Archivos con Multer
 *     description: Endpoints para la subida de archivos utilizando Multer.
 */

/**
 * @swagger
 * /SubirArchivoServidor:
 *   post:
 *     summary: Sube un archivo al servidor utilizando Multer.
 *     description: Sube un archivo al servidor.
 *     tags: [Subida de Archivos con Multer]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Archivo subido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 file:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     size:
 *                       type: number
 *                     mimetype:
 *                       type: string
 *       400:
 *         description: Archivo no proporcionado o inválido.
 *       500:
 *         description:: Error interno del servidor.
 */

/**
 * Controlador para subir un archivo.
 *
 * @async
 * @function subirArchivo
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
exports.subirArchivo = async (req, res) => {
    try {
      const archivo = req.file; // Archivo cargado por el cliente
      if (!archivo) {
        throw new Error('No se ha proporcionado ningún archivo.');
      }
      await multerService.guardarArchivo(archivo);
      res.status(200).json({ message: httpMessages.OK, filename: archivo.filename });
    } catch (error) {
      logger.error(`Error al subir archivo: ${error.message}`);
      res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
    }
  };