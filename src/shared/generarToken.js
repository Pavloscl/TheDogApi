// Importar módulos necesarios
const logger = require('../infrastructure/logger'); // Logger personalizado para registrar eventos
const jwt = require('jsonwebtoken'); // Librería para generar y verificar tokens JWT
const config = require('../config/config'); // Configuración personalizada del proyecto

/**
 * @file Utilidad para generar tokens JWT.
 * Este módulo gestiona la generación de tokens JWT utilizando una clave secreta
 * y opciones configurables. También carga las variables de entorno necesarias
 * para la configuración del entorno.
 * 
 * @module generarToken
 */

// Validar que la clave secreta esté configurada
if (!config.jwtSecret) {
    logger.error('❌ La clave secreta JWT no está configurada en el archivo .env');
    throw new Error('La clave secreta JWT no está configurada.');
}

/**
 * Genera un token JWT.
 * 
 * @function generarToken
 * @param {Object} payload - Los datos que se incluirán en el token.
 * @param {string} [secret=config.jwtSecret] - La clave secreta para firmar el token.
 * @param {Object} [options] - Opciones adicionales para el token (opcional).
 * @returns {string} El token JWT generado.
 */
function generarToken(payload, secret = config.jwtSecret, options = { expiresIn: config.jwtExpiration }) {
    try {
        const token = jwt.sign(payload, secret, options);
        return token;
    } catch (error) {
        logger.error('❌ Error al generar el token JWT:', error);
        throw error;
    }
}

// Si el archivo se ejecuta directamente con Node, genera y muestra un token de ejemplo
if (require.main === module) {
    const payload = { username: 'admin' };
    try {
        const token = generarToken(payload);
        logger.info(`Token generado: ${token}`); // Ahora sí muestra el token
    } catch (error) {
        logger.error('Error al generar el token:', error.message);
    }
}

module.exports = {
    generarToken,
};