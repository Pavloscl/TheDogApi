// Importar las dependencias necesarias
const express = require('express'); // Framework de Node.js para crear aplicaciones web
const router = express.Router(); // Crear un enrutador de Express
const azureBlobController = require('../../controllers/azure/azureBlobController');
const multer = require('multer'); // Middleware para manejar multipart/form-data, utilizado para subir archivos
const upload = multer(); // Inicializar multer sin configuración adicional

/**
 * @file Ruta .
 * Este archivo define las rutas para interactuar con los archivos en Azure Blob Storage.
 * 
 * @module routes/azureBlobRoutes
 * @requires express
 * @requires ../controllers/azureBlobController
 * @requires multer
 */

/**
 * @route POST /SubirArchivo
 * @group AzureBlob - Operaciones relacionadas con Azure Blob Storage
 * @returns {Array} 200 - Lista de todos los feriados obtenidos desde la API externa
 * @returns {Error}  401 - No autorizado
 * @returns {Error}  500 - Error interno del servidor
 * @description Sube un archivo a Azure Blob Storage.
 * @param {file} file - Archivo a subir
 */
router.post('/SubirArchivo', upload.single('file'), azureBlobController.subirArchivo);

/**
 * @file Ruta .
 * Este archivo define las rutas para interactuar con los archivos en Azure Blob Storage.
 * 
 * @module routes/azureBlobRoutes
 * @requires express
 * @requires ../controllers/azureBlobController
 * @requires multer
 */

/**
 * @route GET /DescargarArchivo
 * @group AzureBlob - Operaciones relacionadas con Azure Blob Storage
 * @returns {Array} 200 - Lista de todos los feriados obtenidos desde la API externa
 * @returns {Error}  401 - No autorizado
 * @returns {Error}  500 - Error interno del servidor
 * @description Sube un archivo a Azure Blob Storage.
 * @param {file} file - Archivo a Descargar
 * @param {string} nombreArchivo - Nombre del archivo a descargar   
 */
router.get('/DescargarArchivo', azureBlobController.descargarArchivo);

module.exports = router;