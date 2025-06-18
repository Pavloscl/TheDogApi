// Importar las dependencias necesarias
const express = require('express');
const router = express.Router();
const nutricionController = require('../../controllers/openai/nutricionController');

/**
 * @route POST /CalcularDieta
 * @group Nutrición - Operaciones relacionadas con nutrición
 * @returns {string} 200 - Plan nutricional generado
 * @returns {Error} 500 - Error al generar plan
 */
router.post('/CalcularDieta', nutricionController.calcularDieta);

module.exports = router;