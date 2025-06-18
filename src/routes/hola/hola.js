const express = require('express');
const router = express.Router();
const holaController = require('../../controllers/hola/holaController');

router.get('/hola', holaController.saludar);

module.exports = router;
