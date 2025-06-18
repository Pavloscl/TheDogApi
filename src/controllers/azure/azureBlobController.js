// Importación de módulos y configuraciones necesarias
const azureBlobService = require('../../domain/services/azure/azureBlobService'); // Servicio de Azure Blob Storage
const logger = require('../../infrastructure/logger'); // Logger personalizado para registrar eventos
const httpMessages = require('../../shared/messages/http'); // Mensajes estándar HTTP

/**
 * @file Controlador para gestionar los endpoints relacionados con servicios Blob Storage Azure.
 * Este archivo define las funciones que manejan las solicitudes HTTP relacionadas
 * a bajada y subida archivo con servicios Blob Storage Azure.
 * 
 * @module blobController
 */

/**
 * @swagger
 * tags:
 *   - name: Blob Storage en Azure
 *     description: Endpoints relacionados con la subida y bajada de archivos en Azure Blob Storage.
 */

/**
 * @swagger
 * /SubirArchivo:
 *   post:
 *     summary: Subir un archivo a Azure Blob Storage
 *     description: Sube un archivo a Azure Blob Storage.
 *     tags: [Blob Storage en Azure]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               containerName:
 *                 type: string
 *                 description: Nombre del contenedor en Azure Blob Storage.
 *                 example: "mi-contenedor"
 *               blobName:
 *                 type: string
 *                 description: Nombre del blob (archivo) en Azure Blob Storage.
 *                 example: "mi-archivo.txt"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a subir.
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
 *                   example: "Archivo subido exitosamente."
 *       500:
 *         description: Error al subir el archivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo subir el archivo."
 */

/**
 * Controlador para subir un archivo a Azure Blob Storage.
 * 
 * @async
 * @function subirArchivo
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
exports.subirArchivo = async (req, res) => {
  try {
    const { containerName, blobName } = req.body;
    const content = req.file.buffer;
    await azureBlobService.subirArchivo(containerName, blobName, content);
    res.status(200).json({ message: httpMessages.OK });
  } catch (error) {
    logger.error('Error al subirArchivo:', error);
    res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
  }
};

/**
 * @swagger
 * /DescargarArchivo:
 *   get:
 *     summary: Descargar un archivo desde Azure Blob Storage
 *     description: Descarga un archivo desde Azure Blob Storage.
 *     tags: [Blob Storage en Azure]
 *     parameters:
 *       - in: query
 *         name: containerName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del contenedor en Azure Blob Storage.
 *         example: "mi-contenedor"
 *       - in: query
 *         name: blobName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del blob (archivo) en Azure Blob Storage.
 *         example: "mi-archivo.txt"
 *     responses:
 *       200:
 *         description: Archivo descargado exitosamente.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error al descargar el archivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo descargar el archivo."
 */

/**
 * Controlador para descargar un archivo desde Azure Blob Storage.
 * 
 * @async
 * @function descargarArchivo
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
exports.descargarArchivo = async (req, res) => {
  try {
    const { containerName, blobName } = req.query;
    const content = await azureBlobService.descargarArchivo(containerName, blobName);
    res.status(200).send(content);
  } catch (error) {
    logger.error('Error al descargarArchivo:', error);
    res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
  }
};