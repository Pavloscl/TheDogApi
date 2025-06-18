// Importar dependencias necesarias
const dotenv = require('dotenv');

/**
 * Determina el entorno actual y carga las variables de entorno desde el archivo correspondiente.
 * 
 * Por defecto, se utiliza el entorno 'development' si no se define la variable NODE_ENV.
 */
const environment = process.env.NODE_ENV || 'development'; // Entorno actual (development, production, etc.)
const envFile = `.env.${environment}`; // Archivo .env correspondiente al entorno

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: envFile });

/**
 * Exporta las variables de entorno como un objeto de configuración.
 * 
 * Este módulo centraliza todas las configuraciones del proyecto, facilitando su acceso
 * y asegurando que las variables estén correctamente definidas.
 */
module.exports = {
  // Configuración de modo de entorno
  modo_entorno_env: process.env.NODE_ENV || 'development', // Modo de entorno por defecto (development, production, etc.)

  // Configuración del titulo de la aplicación
  title_app: process.env.TITLE_APP || 'Mi Aplicación', // Título de la aplicación por defecto

// Configuración de OpenAI
  apiKeyOpenIa: process.env.OPENAI_API_KEY || 'default_api_key_openia', // Clave de API de OpenAI
  apiUrlOpenAi: process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions', // URL de la API de OpenAI

  // Configuración del servidor
  host: process.env.HOST || 'localhost', // Host por defecto
  port: process.env.PORT || 3000, // Puerto por defecto

  // Configuración de dominio del sitio
  url_site: process.env.URL_SITE || 'http://localhost:3000', // Dominio por defecto

  // Configuración de CORS y límites para solicitudes
  allowedOrigins: process.env.ALLOWED_ORIGINS || '*', // Orígenes permitidos para CORS (por defecto todos)
  jsonLimit: process.env.JSON_LIMIT || '10mb', // Límite de tamaño para JSON (por defecto 10 MB)
  urlencodedLimit: process.env.URLENCODED_LIMIT || '10mb', // Límite de tamaño para datos URL-encoded (por defecto 10 MB)

  // Configuración de la base de datos
  dbHost: process.env.DB_HOST || 'localhost', // Host por defecto
  dbPort: process.env.DB_PORT || 5432, // Puerto por defecto de PostgreSQL
  dbUser: process.env.DB_USER || 'default_user', // Usuario por defecto
  dbPass: process.env.DB_PASS || 'default_password', // Contraseña por defecto
  dbName: process.env.DB_NAME || 'default_db_name', // Nombre de la base de datos por defecto

  // Configuración de Azure Storage
  azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || 'default_connection_string',
  azureStorageContainer: process.env.AZURE_STORAGE_CONTAINER || 'default_container',

  // Configuración de SendGrid
  sendgridApiKey: process.env.SENDGRID_API_KEY || 'default_api_key',
  sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL || 'default_from_email',

  // Configuración de APIs externas
  apiFeriados: process.env.API_FERIADOS || 'https://feriados.cl/api/', // URL de la API de feriados

  // Configuración de JWT
  jwtSecret: process.env.JWT_SECRET || 'secret', // Clave secreta para firmar tokens JWT
  jwtExpiration: process.env.JWT_EXPIRATION || '1h', // Tiempo de expiración del token JWT (por defecto 1 hora)

  // Configuración de encriptación
  encryption_key: process.env.ENCRYPTION_KEY || 'default_encryption_key', // Clave de encriptación para la base de datos

  // Configuración de tareas programadas (cron jobs)
  cronExpression: process.env.CRON_EXPRESSION || '0 0 * * *', // Expresión cron por defecto (ejemplo: todos los días a medianoche)
  cronTimezone: process.env.CRON_TIMEZONE || 'America/Santiago', // Zona horaria por defecto

  // Configuración de rutas y API
  base_api: process.env.BASE_PATH_API || '/api', // Ruta base de la API

  // Configuración de intervalos y reitentos sobre una API
  apiIntervalo: parseInt(process.env.API_INTERVALO,10) || 5000, // Intervalo entre reintentos
  apiReintentos: parseInt(process.env.API_REINTENTOS,10) || 3, // Número de reintentos

  // Configuración de Límite de Solicitudes por Ventana de Tiempo
  requestLimitWindowMs: parseInt(process.env.REQUEST_LIMIT_WINDOWS_MS,10) || 60000, // Ventana de tiempo (en milisegundos) para limitar las solicitudes.
  maxRequestsPerWindow: parseInt(process.env.MAX_REQUEST_PER_WINDOWS,10) || 100, // Número de reintentos
};