const express = require('express');
const router = express.Router();
const tareasController = require('../../controllers/tareas/tareasController');
const verifyToken = require('../../middleware/authJwt');

router.get('/tareasjwt', verifyToken, tareasController.obtenerTareas);

module.exports = router;
