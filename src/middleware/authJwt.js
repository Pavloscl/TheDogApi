/**
 * @file authMiddlewareJWT.js
 * @module middlewares/authMiddlewareJWT
 * 
 * Middleware de autenticación basado en JSON Web Tokens (JWT).
 * Verifica la validez del token JWT proporcionado en el encabezado de autorización.
 * 
 * 🚫 Protege rutas privadas asegurando que solo usuarios autenticados puedan acceder.
 * 🔒 Valida tokens firmados con la clave secreta definida en `config.js`.
 * 🧠 Configurable desde archivo global `config.js`.
 */

// Importación de módulos y configuraciones necesarias
const jwt = require('jsonwebtoken'); // Librería para verificar tokens JWT
const logger = require('../infrastructure/logger'); // Logger personalizado para registrar eventos
const config = require('../config/config'); // Configuración personalizada del proyecto

/**
 * Middleware de autenticación JWT.
 * 
 * Este middleware verifica la validez del token JWT proporcionado en el encabezado de autorización.
 * Si el token es válido, se añade el ID del usuario a la solicitud (`req.userId`) y se llama al siguiente middleware.
 * Si el token no es válido o no se proporciona, se devuelve una respuesta de error con el código de estado 401.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @returns {void}
 * 
 */
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verificar si el encabezado de autorización está presente
    if (!authHeader) {
        logger.warn('Token no proporcionado en la solicitud');
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Extraer el token del encabezado
    const token = authHeader.split(' ')[1];

    // Verificar la validez del token
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            logger.error('Error al autenticar el token:', err);
            return res.status(401).json({ message: 'Error al autenticar el token' });
        }

        // Añadir el ID del usuario decodificado a la solicitud
        req.userId = decoded.id;
        logger.info(`Token autenticado correctamente para el usuario con ID: ${req.userId}`);
        next();
    });
};

module.exports = authMiddleware;