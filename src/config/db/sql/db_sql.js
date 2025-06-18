// Importación de módulos y configuraciones necesarias
const sql = require('mssql'); // Cliente de SQL Server
const config = require('../../config'); // Configuración personalizada del proyecto

/**
 * @file Configuración de la conexión a la base de datos SQL Server.
 * Este módulo configura la conexión al cliente de SQL Server utilizando las
 * variables de entorno definidas en archivos `.env` específicos según el entorno
 * de ejecución (por ejemplo, desarrollo, producción, etc.). Además, gestiona
 * la configuración de SSL para las conexiones a la base de datos, según el entorno.
 * 
 * @module dbConnection
 */

/**
 * Configuración para determinar si se está ejecutando en un entorno local.
 * Si el entorno es 'development', la conexión a la base de datos no utilizará SSL.
 * 
 * @constant
 * @type {boolean}
 */
const isLocal = config.modo_entorno_env === 'development'; // Verifica si el entorno es local (development)

/**
 * Configuración del cliente de SQL Server utilizando el paquete `mssql`.
 * Se utilizan las variables de entorno para definir los parámetros de
 * conexión a la base de datos.
 * 
 * @constant
 * @type {sql.ConnectionPool}
 * @see {@link https://www.npmjs.com/package/mssql}
 */
const pool = new sql.ConnectionPool({
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASS, // Contraseña del usuario
  server: process.env.DB_HOST, // Dirección del host de la base de datos
  database: process.env.DB_NAME, // Nombre de la base de datos
  options: {
    encrypt: !isLocal, // Utiliza SSL si no es entorno local
    trustServerCertificate: isLocal // Confía en el certificado del servidor si es entorno local
  }
});

/**
 * Exporta el pool de conexiones configurado y el módulo sql.
 * 
 * Este pool se puede utilizar en otros módulos para realizar consultas
 * a la base de datos SQL Server.
 * 
 * @module dbConnection
 */
module.exports = { pool, sql };