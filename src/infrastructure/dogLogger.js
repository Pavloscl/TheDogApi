
const winston = require('winston'); // Cliente de Winston para logging
const config = require('../config/config'); // Configuración personalizada del proyecto
const path = require('path'); // Módulo para manejar rutas de archivos


const logLevel = config.modo_entorno_env === 'production' ? 'info' : 'debug';

const dogLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/perros.log'),
      level: 'info'
    })
  ]
});

module.exports = dogLogger;
