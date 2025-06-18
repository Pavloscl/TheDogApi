const express = require('express');
const router = express.Router();
const { obtenerFlujoOrdenado } = require('../../controllers/flujo/flujoController'); 

router.get('/orden', obtenerFlujoOrdenado);

module.exports = router;
