// Importación de módulos y configuraciones necesarias
const mysql = require('mysql2/promise'); // Cliente de MySQL
const config = require('../../config'); // Configuración personalizada del proyecto

/**
 * @file Configuración de la conexión a la base de datos MySQL.
 * Este módulo configura y exporta un pool de conexiones a la base de datos MySQL,
 * utilizando las variables de entorno definidas en archivos `.env` específicos
 * según el entorno de ejecución (desarrollo, producción, etc.).
 * 
 * También incluye una función para probar la conexión al iniciar la aplicación.
 * 
 * @module db_mysql
 */

/**
 * Determina si el entorno actual es local.
 * Si el entorno es 'local', la conexión a la base de datos no utilizará SSL.
 * 
 * @constant
 * @type {boolean}
 */
const isLocal = config.modo_entorno_env === 'development'; // Verifica si el entorno es local (development)

/**
 * Configuración del pool de conexiones MySQL.
 * Utiliza las variables de entorno para definir los parámetros de conexión.
 * 
 * @constant
 * @type {Pool}
 * @see {@link https://github.com/sidorares/node-mysql2#using-connection-pools}
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Dirección del host de la base de datos
  port: process.env.DB_PORT || 3306, // Puerto de la base de datos (por defecto 3306)
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASS, // Contraseña del usuario
  database: process.env.DB_NAME, // Nombre de la base de datos
  ssl: isLocal ? false : { rejectUnauthorized: false }, // Configuración SSL (desactivada en local)
  waitForConnections: true, // Esperar conexiones disponibles
  connectionLimit: 10, // Límite máximo de conexiones en el pool
  queueLimit: 0 // Sin límite para la cola de conexiones
});

/**
 * Exporta el pool de conexiones configurado.
 * 
 * Este pool se puede utilizar en otros módulos para realizar consultas
 * a la base de datos MySQL.
 * 
 * @module db_mysql
 */
module.exports = pool;