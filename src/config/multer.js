// Importación de módulos y configuraciones necesarias
const multer = require('multer'); // Middleware para la carga de archivos
const path = require('path'); // Módulo para manejar rutas de archivos
const fs = require('fs'); // Módulo para manejar el sistema de archivos

/**
 * @file Configuración para la gestión de carga de archivos utilizando `multer`.
 * Este módulo configura `multer` para gestionar la carga de archivos en el servidor.
 * Los archivos se almacenan en el sistema de archivos local con nombres únicos
 * para evitar colisiones, organizados en una carpeta de destino específica.
 * 
 * @module fileUpload
 */

/**
 * Configuración del almacenamiento para los archivos cargados.
 * Se utiliza la función `diskStorage` de `multer` para definir cómo y dónde
 * se deben almacenar los archivos en el sistema local.
 * 
 * @constant
 * @type {multer.StorageEngine}
 * 
 * @see {@link https://www.npmjs.com/package/multer#diskstorage}
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads'); // Ruta de la carpeta de destino
    // Crear la carpeta de destino si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crear la carpeta de forma recursiva
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`; // Generar nombre único
    cb(null, uniqueName);
  }
});

/**
 * Middleware de `multer` para gestionar la carga de archivos.
 * Utiliza la configuración de almacenamiento definida anteriormente.
 * 
 * @constant
 * @type {multer.Instance}
 */
const upload = multer({ storage });

/**
 * Exporta el middleware `upload` para ser utilizado en rutas de carga de archivos.
 * 
 * Este middleware puede ser usado en las rutas para manejar la carga de archivos
 * de manera eficiente, permitiendo el almacenamiento en el sistema local con nombres
 * únicos y un destino predefinido.
 * 
 * @exports upload
 */
module.exports = upload;