// Importación de módulos y configuraciones necesarias
const winston = require('winston'); // Cliente de Winston para logging
const config = require('../config/config'); // Configuración personalizada del proyecto
const path = require('path'); // Módulo para manejar rutas de archivos

/**
 * @file Configuración del logger utilizando Winston.
 * Este módulo configura un logger utilizando la librería Winston para proporcionar
 * un sistema de logging consistente y estructurado en toda la aplicación.
 * 
 * El logger puede ser utilizado para registrar mensajes de diferentes niveles
 * (info, warn, error, etc.) y soporta múltiples transportes (consola, archivos, etc.).
 * 
 * @module logger
 */

/**
 * Determina el nivel de logging según el entorno.
 * 
 * - En entornos de desarrollo, el nivel predeterminado es 'debug'.
 * - En entornos de producción, el nivel predeterminado es 'info'.
 * 
 * @constant
 * @type {string}
 */
const logLevel = config.modo_entorno_env === 'production' ? 'info' : 'debug';

/**
 * Crear una instancia del logger de Winston.
 * 
 * La configuración del logger incluye:
 * - Nivel de logging dinámico basado en el entorno.
 * - Formato de logging: combinación de timestamp, colorización y formato JSON.
 * - Transportes: salida de los logs a la consola y, opcionalmente, a un archivo.
 * 
 * @constant
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Agregar timestamp a los logs
    winston.format.colorize(), // Colorizar los logs para facilitar la lectura
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Salida de logs a la consola
    // Descomentar para habilitar logging en archivo
    new winston.transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(__dirname, '../../logs/combined.log') })
  ],
});

/**
 * Exportar la instancia del logger para ser utilizada en otros módulos.
 * 
 * Ejemplo de uso:
 * const logger = require('./logger');
 * logger.info('Mensaje informativo');
 * logger.error('Mensaje de error');
 * 
 * @exports logger
 */
module.exports = logger;