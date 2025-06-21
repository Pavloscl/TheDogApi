// Importar las dependencias necesarias
const express = require('express'); // Framework de Node.js para crear aplicaciones web
const router = express.Router(); // Router de Express para definir rutas
const dogController = require('../../controllers/dog/dogController'); // Controlador para gestionar informacion de razas caninas


router.get('/ObtenerListadoCanino',  dogController.obtenerDatosCaninos);
router.get('/ObtenerImagenPorRaza/:id',dogController.obtenerImagenPorRaza);


module.exports = router;