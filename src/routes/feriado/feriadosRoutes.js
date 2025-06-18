// Importar las dependencias necesarias
const express = require('express'); // Framework de Node.js para crear aplicaciones web
const router = express.Router(); // Router de Express para definir rutas
const feriadosController = require('../../controllers/feriado/feriadosController'); // Controlador para gestionar feriados
const authMiddleware = require('../../middleware/authJwt'); // Middleware de autenticación

/**
 * @file Rutas relacionadas con la gestión de feriados.
 * Este archivo define las rutas para interactuar con los feriados, incluyendo
 * la obtención de feriados desde una API externa, la carga de feriados en el sistema
 * y la consulta de feriados legales almacenados.
 * 
 * @module routes/feriadosRoutes
 * @requires express
 * @requires ../controllers/feriadosController
 * @requires ../middleware/authMiddleware
 */

/**
 * @route GET /ObtenerFeriados
 * @group Feriados - Operaciones relacionadas con los feriados
 * @returns {Array} 200 - Lista de todos los feriados obtenidos desde la API externa
 * @returns {Error}  401 - No autorizado
 * @returns {Error}  500 - Error interno del servidor
 * @description Obtiene una lista de todos los feriados desde una API externa.
 */
router.get('/ObtenerFeriados', authMiddleware, feriadosController.obtenerFeriados);

/**
 * @route GET /CargarFeriados
 * @group Feriados - Operaciones relacionadas con los feriados
 * @returns {Object} 200 - Mensaje de éxito indicando que los feriados fueron cargados
 * @returns {Error}  401 - No autorizado
 * @returns {Error}  500 - Error interno del servidor
 * @description Carga nuevos feriados en el sistema desde una API externa.
 */
router.get('/CargarFeriados', authMiddleware, feriadosController.cargarFeriados);

/**
 * @route GET /ObtenerFeriadosLegales
 * @group Feriados - Operaciones relacionadas con los feriados
 * @returns {Array} 200 - Lista de todos los feriados legales almacenados en el sistema
 * @returns {Error}  500 - Error interno del servidor
 * @description Obtiene una lista de todos los feriados legales registrados en el sistema.
 */
router.get('/ObtenerFeriadosLegales', feriadosController.obtenerFeriadosLegales);

/**
 * Exporta el router configurado para ser utilizado en la aplicación principal.
 * 
 * @exports router
 */
module.exports = router;