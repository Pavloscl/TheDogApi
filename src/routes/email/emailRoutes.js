// Importar las dependencias necesarias
const express = require('express'); // Framework de Node.js para crear aplicaciones web
const router = express.Router(); // Router de Express para definir rutas
const emailController = require('../../controllers/email/emailController'); // Controlador para gestionar el envío de correos electrónicos

/**
 * @file Rutas relacionadas con la gestión de feriados.
 * Este archivo define las rutas para interactuar con los feriados, incluyendo
 * la obtención de feriados desde una API externa, la carga de feriados en el sistema
 * y la consulta de feriados legales almacenados.
 * 
 * @module routes/emailRoutes
 * @requires express
 * @requires ../controllers/emailController
 */

/**
 * @route POST /SendEmail
 * @group Email - Operaciones relacionadas con el envío de correos electrónicos
 * @returns {Array} 200 - Mensaje de éxito indicando que el correo fue enviado
 * @returns {Error}  401 - No autorizado
 * @returns {Error}  500 - Error interno del servidor
 * @description Envía un correo electrónico utilizando el controlador de correos.
 */
router.post('/SendEmail', emailController.enviarCorreo);

/**
 * Exporta el router configurado para ser utilizado en la aplicación principal.
 * 
 * @exports router
 */
module.exports = router;