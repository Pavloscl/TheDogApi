const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/flujo/asincronoController');

router.get('/asincrono', ctrl.getAsincrono);

module.exports = router;
