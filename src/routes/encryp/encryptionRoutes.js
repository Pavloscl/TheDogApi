// Importar las dependencias necesarias
const express = require('express'); // Framework de Node.js para crear aplicaciones web
const router = express.Router(); // Router de Express para definir rutas
const encryptionController = require('../../controllers/encryp/encryptionController'); // Controlador para gestionar la encriptación de datos

/**
 * @file Rutas relacionadas con la encriptación de datos.
 * 
 * @module routes/encryptionRoutes
 * @requires express
 * @requires ../controllers/encryptionController
 */

/**
 * @route POST /Encriptar
 * @param {string} texto.body.required - Texto a encriptar  
 * @returns {Array} 200 - Mensaje de éxito indicando que el correo fue enviado
 * @returns {Error}  401 - No autorizado
 * @returns {Error}  500 - Error interno del servidor
 * @description Endpoint para encriptar un texto utilizando el algoritmo XXX-XXX-XXX.
 */
router.post('/Encriptar', encryptionController.encriptarTexto);

/**
 * @route POST /Desencriptar
 * @param {string} encrypted.body.required - Texto a desencriptar  
 * @param {string} iv.body.required - Vector de inicialización utilizado durante la encriptación
 * @returns {Array} 200 - Mensaje de éxito indicando que el correo fue enviado
 * @returns {Error}  401 - No autorizado
 * @returns {Error}  500 - Error interno del servidor
 * @description Endpoint para desencriptar un texto utilizando el algoritmo XXX-XXX-XXX.
 */
router.post('/Desencriptar', encryptionController.desencriptarTexto);

module.exports = router;