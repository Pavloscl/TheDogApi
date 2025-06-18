const express = require('express');
const router = express.Router();
const controller = require('../../controllers/logger/loggerController');

router.get('/saludo', controller.saludar);
router.get('/error', controller.errorSimulado);

module.exports = router;
