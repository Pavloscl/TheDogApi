const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/flujo/sincronoController');

router.get('/sincrono', ctrl.getSincrono);

module.exports = router;