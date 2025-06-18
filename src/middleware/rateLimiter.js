/**
 * @file rateLimiter.js
 * @module middlewares/rateLimiter
 * 
 * Middleware de protección ante abuso de solicitudes HTTP usando `express-rate-limit`.
 * Limita el número de peticiones que una IP puede realizar en un intervalo de tiempo definido.
 * 
 * 🚫 Previene ataques tipo DoS/DDoS
 * 📈 Controla sobrecargas por spam o scraping masivo
 * 🧠 Configurable desde archivo global `config.js`
 */

// Importación de módulos y configuraciones necesarias
const rateLimit = require('express-rate-limit'); // Middleware de limitación de solicitudes
const config = require('../config/config'); // Configuración del sistema
const logger = require('../infrastructure/logger'); // Logger personalizado (ej. Winston)

/**
 * Middleware de limitación de solicitudes HTTP.
 * Aplica restricciones por IP para evitar sobrecarga o uso indebido de la API.
 * 
 * Parámetros definidos por `config`:
 * - `windowMs`: intervalo de tiempo (en milisegundos)
 * - `max`: cantidad máxima de solicitudes por IP
 * 
 * El mensaje de error es fijo, pero puede parametrizarse si se desea.
 */
const limiter = rateLimit({
  // Duración de la ventana de tiempo (ej. 60 segundos) - Ejemplo 60,000 ms = 1 minuto
  windowMs: config.requestLimitWindowMs,

  // Número máximo de solicitudes permitidas por IP dentro de la ventana - Ejemplo 100 peticiones
  max: config.maxRequestsPerWindow,

  // Mensaje a retornar cuando se supera el límite
  message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.',

  // Incluir encabezados estándar de rate limit (RateLimit-Limit, etc.)
  standardHeaders: true,

  // Manejador personalizado del error 429
  handler: (req, res) => {
    logger.warn(`[Rate limit] - Demasiadas solicitudes desde la IP: ${req.ip}`);
    res.status(429).json({
      error: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.'
    });
  }
});

/**
 * Exporta el middleware ya configurado.
 */
module.exports = limiter;