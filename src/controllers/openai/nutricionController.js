// Importación de módulos y configuraciones necesarias
const nutricionService = require('../../domain/services/openai/nutricionService'); // Servicio de nutrición para invocar métodos de lógica de negocio
const logger = require('../../infrastructure/logger'); // Logger personalizado para registrar eventos
const httpMessages = require('../../shared/messages/http'); // Mensajes estándar HTTP

/**
 * @file Controlador para gestionar los endpoints relacionados con planes nutricionales.
 * Este archivo define las funciones que manejan las solicitudes HTTP relacionadas
 * con la generación de planes alimenticios personalizados.
 * 
 * @module nutricionController
 */

/**
 * @swagger
 * tags:
 *   - name: Calcular Dieta Nutricional con Open IA
 *     description: Endpoints relacionados con planes nutricionales y recetas utilizando OpenIA.
 */

/**
 * @swagger
 * /CalcularDieta:
 *   post:
 *     summary: Calcula una dieta personalizada con OpenIA.
 *     description: Genera un plan alimenticio según datos personales y objetivo del usuario.
 *     tags: 
 *       - Calcular Dieta Nutricional con Open IA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               edad:
 *                 type: integer
 *                 description: Edad del usuario.
 *               sexo:
 *                 type: string
 *                 enum: [masculino, femenino]
 *                 description: Sexo del usuario.
 *               peso:
 *                 type: number
 *                 description: Peso del usuario en kilogramos.
 *               altura:
 *                 type: number
 *                 description: Altura del usuario en centímetros.
 *               actividad:
 *                 type: string
 *                 enum: [sedentario, ligero, moderado, activo, muy_activo]
 *                 description: Nivel de actividad física del usuario.
 *               objetivo:
 *                 type: string
 *                 enum: [perder_peso, mantener_peso, ganar_musculo]
 *                 description: Objetivo del usuario.
 *     responses:
 *       200:
 *         description: Plan nutricional generado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plan:
 *                   type: string
 *                   description: Plan nutricional generado.
 *       500:
 *         description: Error al generar dieta.
 */

/**
 * Calcula una dieta personalizada basada en los datos del usuario.
 * 
 * @async
 * @function calcularDieta
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.body - Datos del usuario para generar el plan nutricional.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Responde con el plan nutricional generado o un mensaje de error.
 * 
 * @throws {Error} Si ocurre un error al generar la dieta personalizada.
 * 
 * @example
 * // Solicitud HTTP
 * POST /CalcularDieta
 * {
 *   "edad": 30,
 *   "sexo": "masculino",
 *   "peso": 70,
 *   "altura": 175,
 *   "actividad": "activo",
 *   "objetivo": "ganar_musculo"
 * }
 * 
 * // Respuesta HTTP
 * {
 *   "plan": "Plan alimenticio personalizado..."
 * }
 */
exports.calcularDieta = async (req, res) => {
    try {
        const dieta = await nutricionService.calcularDieta(req.body);
        res.status(200).json({ plan: dieta });
    } catch (error) {
        logger.error('Error al calcular dieta:', error);
        res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
    }
};