// Importar las dependencias necesarias
const express = require('express'); // Framework de Node.js para crear aplicaciones web
const router = express.Router(); // Router de Express para definir rutas
const dogController = require('../../controllers/dog/dogController'); // Controlador para gestionar informacion de razas caninas
const authMiddleware = require('../../middleware/authJwt'); // Middleware de autenticación


router.get('/ObtenerListadoCanino', authMiddleware, dogController.obtenerDatosCaninos);
//router.get('/Tarea2', authMiddleware, dogController.obtenerDatosCaninos);
//router.get('/tarea3', authMiddleware, dogController.obtenerDatosCaninos);



module.exports = router;