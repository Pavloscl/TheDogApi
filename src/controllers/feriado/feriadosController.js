// Importación de módulos y configuraciones necesarias
const feriadosService = require('../../domain/services/feriado/feriadosService'); // Servicio de Feriados para invocar métodos de feriados
const logger = require('../../infrastructure/logger'); // Logger personalizado para registrar eventos
const httpMessages = require('../../shared/messages/http'); // Mensajes estándar HTTP

/**
 * @file Controlador para gestionar los endpoints relacionados con feriados.
 * Este archivo define las funciones que manejan las solicitudes HTTP relacionadas
 * con la obtención, carga y consulta de feriados.
 * 
 * @module feriadosController
 */

/**
 * @swagger
 * tags:
 *   - name: Gestión de Feriados y Tokens
 *     description: Endpoints para la obtención de feriados, su persistencia en base de datos, y el uso de tokens para consumir APIs propias.
 */

/**
 * @swagger
 * /ObtenerFeriados:
 *   get:
 *     summary: Obtiene todos los feriados mediante una API externa. [Requiere token]
 *     description: Retorna una lista de todos los feriados obtenidos desde una API externa.
 *     tags: [Gestión de Feriados y Tokens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de feriados obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Fecha:
 *                     type: string
 *                     description: Fecha del feriado
 *                   Titulo:
 *                     type: string
 *                     description: Título del feriado
 *                   Tipo_Feriado:
 *                     type: string
 *                     description: Tipo de feriado
 *                   Irrenunciable:
 *                     type: boolean
 *                     description: Indica si el feriado es inalienable
 *                   Tipo_Feriado_Descripcion:
 *                     type: string
 *                     description: Información adicional sobre el feriado
 *       500:
 *         description: Error al obtener feriados.
 */
exports.obtenerFeriados = async (req, res) => {
    try {
        const feriados = await feriadosService.obtenerFeriados();
        res.json(feriados);
    } catch (error) {
        logger.error('Error al obtener feriados:', error);
        res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
    }
};

/**
 * @swagger
 * /CargarFeriados:
 *   get:
 *     summary: Carga nuevos feriados en el sistema desde una API externa. [Requiere token]
 *     description: Permite cargar nuevos feriados obtenidos desde una API externa en el sistema.
 *     tags: [Gestión de Feriados y Tokens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Feriados cargados exitosamente.
 *       500:
 *         description: Error al cargar feriados.
 */
exports.cargarFeriados = async (req, res) => {
    try {
        const response = await feriadosService.obtenerFeriados();
        await feriadosService.cargarFeriados(response);
        res.status(200).json({ message: httpMessages.OK });
    } catch (error) {
        logger.error('Error al cargar feriados:', error);
        res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
    }
};

/**
 * @swagger
 * /ObtenerFeriadosLegales:
 *   get:
 *     summary: Obtiene todos los feriados registrados en el sistema. [No requiere token]
 *     description: Retorna una lista de todos los feriados legales almacenados en el sistema.
 *     tags: [Gestión de Feriados y Tokens]
 *     responses:
 *       200:
 *         description: Lista de feriados legales obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Fecha:
 *                     type: string
 *                     description: Fecha del feriado
 *                   Titulo:
 *                     type: string
 *                     description: Título del feriado
 *                   Tipo_Feriado:
 *                     type: string
 *                     description: Tipo de feriado
 *                   Irrenunciable:
 *                     type: boolean
 *                     description: Indica si el feriado es inalienable
 *                   Tipo_Feriado_Descripcion:
 *                     type: string
 *                     description: Información adicional sobre el feriado
 *       500:
 *         description: Error al obtener feriados legales.
 */
exports.obtenerFeriadosLegales = async (req, res) => {
    try {
        const feriados = await feriadosService.obtenerFeriadosLegales();
        res.json(feriados);
    } catch (error) {
        logger.error('Error al obtener feriados legales:', error);
        res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
    }
};