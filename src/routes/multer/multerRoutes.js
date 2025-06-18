// Importar las dependencias necesarias
const express = require('express'); // Importar express para crear el router
const router = express.Router(); // Crear un nuevo router de express
const multerController = require('../../controllers/multer/multerController'); // Controlador para manejar la lógica de negocio relacionada con la subida de archivos
const upload = require('../../config/multer'); // Configuración personalizada de multer

/**
 * Ruta para subir un archivo.
 * 
 * @route POST /SubirArchivo
 * @group Archivos - Operaciones relacionadas con la gestión de archivos
 * @consumes multipart/form-data
 * @param {file} file.formData.required - Archivo a subir
 * @returns {Object} 200 - Archivo subido exitosamente
 * @returns {Error} 500 - Error al subir el archivo
 */
router.post('/SubirArchivoServidor', upload.single('file'), multerController.subirArchivo);

module.exports = router;