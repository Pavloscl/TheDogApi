

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const perrosController = require('../../controllers/dog/dogController');

// Limiter general para todas las rutas /perros
const perrosLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
router.use(perrosLimiter);

router.get('/dog/listarRazas', perrosController.listarRazas);

router.get('/dog/imagen/:id', perrosController.obtenerImagenRaza);

router.post('/dog/favoritos', perrosController.agregarFavorito);

router.get('/dog/favoritos', perrosController.listarFavoritos);

router.delete('/dog/favoritos/:id', perrosController.eliminarFavorito);

router.get('/dog/topPerros3', perrosController.top3Favoritas);

router.get('/dog/InformacionRaza/:id', perrosController.obtenerInformacionRazaPorId);

module.exports = router;
