// Importar módulos necesarios
const express = require('express');
const cors = require('cors'); // Middleware para habilitar CORS
const config = require('./config/config'); // Configuración de variables del proyecto
const logger = require('./infrastructure/logger'); // Logger personalizado para registrar eventos
const swaggerUi = require('swagger-ui-express'); // Middleware para servir la documentación de Swagger
const swaggerSpec = require('./config/docs/swagger'); // Configuración de Swagger
const bodyParser = require('body-parser'); // Middleware para analizar el cuerpo de las solicitudes
const helmet = require('helmet'); // Middleware para proteger la aplicación de vulnerabilidades comunes
const { xss } = require('express-xss-sanitizer'); // Middleware para sanitizar entradas y prevenir XSS
const limiter = require('./middleware/rateLimiter'); // Importar el middleware de limitación de solicitudes

// Importar rutas de la API
const azureBlobRoutes = require('./routes/azure/azureBlobRoutes'); // Rutas de la API
const emailRoutes = require('./routes/email/emailRoutes'); // Rutas de la API
const encryptionRoutes = require('./routes/encryp/encryptionRoutes'); // Rutas de la API
const feriadosRoutes = require('./routes/feriado/feriadosRoutes'); // Rutas de la API
const nutricionRoutes = require('./routes/openai/nutricionRoutes'); // Rutas de la API
const multerRoutes = require('./routes/multer/multerRoutes'); // Rutas de la API

// Importar rutas del taller
const holaRoutes = require('./routes/hola/hola'); // Rutas del taller
const asincronoRoutes = require('./routes/flujo/asincrono'); // Rutas del taller
const sincronoRoutes = require('./routes/flujo/sincrono'); // Rutas del taller
const flujocompletoRoutes = require('./routes/flujo/flujocompleto'); // Rutas del taller
const tareasRoutes = require('./routes/tareas/tareas');  // Rutas del taller
const adminRoutes = require('./routes/admin/admin'); // Rutas del taller
const loggerRoutes = require('./routes/logger/logger');  // Rutas del taller
const mysqlRoutes = require('./routes/mysql/mysql'); // Rutas de MySQL
const tareasjwtRoutes = require('./routes/tareas/tareasjwt');  // Rutas del taller

/**
 * @file Archivo principal de la aplicación.
 * Este archivo inicializa la aplicación Express, configura las rutas, la documentación
 * de Swagger y las variables de entorno, y arranca el servidor.
 * 
 * @module app
 */

/**
 * Inicialización de la aplicación Express.
 * 
 * Configura los middlewares, las rutas y la documentación de Swagger.
 */
const app = express();

// Configuración de Helmet para proteger la aplicación
app.use(helmet());

// Middleware para limitar la tasa de solicitudes
app.use(limiter);

// Configuración de CORS
const corsOptions = {
    origin: config.allowedOrigins, // Orígenes permitidos, por defecto todos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  };
app.use(cors(corsOptions));

// Middleware para sanitizar datos de entrada
app.use(xss());

// Middleware para analizar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de límites para solicitudes
app.use(express.json({ limit: config.jsonLimit })); // Tamaño máximo de JSON: 10 MB
app.use(express.urlencoded({ extended: true, limit: config.urlencodedLimit })); // Tamaño máximo de datos URL-encoded: 10 MB

// Integración de Swagger UI para la documentación de API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
logger.info('📚 Swagger UI configurado en /api-docs');

// Configuración de rutas HTTP para la API
app.use('/api', azureBlobRoutes);
app.use('/api', emailRoutes);
app.use('/api', encryptionRoutes);
app.use('/api', feriadosRoutes);
app.use('/api', nutricionRoutes); 
app.use('/api', multerRoutes); 

// Taller
app.use('/api', holaRoutes); 
app.use('/api', asincronoRoutes); 
app.use('/api', sincronoRoutes); 
app.use('/api', flujocompletoRoutes); 
app.use('/api', tareasRoutes); 
app.use('/api', adminRoutes); 
app.use('/api', loggerRoutes); 
app.use('/api', mysqlRoutes); 
app.use('/api', tareasjwtRoutes); 

logger.info('🌐 Rutas de la API configuradas en /api');

/**
 * Inicialización del servidor.
 * 
 * El servidor escucha en el puerto y host configurados, y registra un mensaje
 * en el logger indicando que está corriendo.
 */
app.listen(config.port, () => {
    logger.info(`🌐 Servidor corriendo en el entorno ${config.modo_entorno_env} en el puerto ${config.port}`);
    logger.info(`📚 Documentación de API disponible en http://${config.host}:${config.port}/api-docs`);
});

/**
 * Exporta la aplicación para pruebas o configuraciones adicionales.
 * 
 * @exports app
 */
module.exports = app;