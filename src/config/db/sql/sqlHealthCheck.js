const pool = require('./mssql');
const logger = require('../../infrastructure/logger');

/**
 * @file SQLHealthCheck.js
 * @description Prueba de conexión a SQL para verificar la disponibilidad de la base de datos.
 */

/**
 * Realiza una verificación activa de conexión a la base de datos.
 * Ideal para utilizar en endpoints de health-check o al iniciar la app.
 *
 * @async
 * @function testSQLConnection
 * @returns {Promise<boolean>} `true` si la conexión es exitosa, `false` si falla.
 */
async function testSQLConnection() {
  try {
    await pool.connect();
    logger.info('✅ Conexión a SQL verificada correctamente.');
    return true;
  } catch (err) {
    logger.error('❌ Falló la conexión a SQL:', err.message);
    return false;
  }
}

/**
 * Exporta la prueba de conexión.
 * 
 * Esta funcion se utiliza para probar la conectividad a la base de datos SQL.
 * 
 * @module sqlHealthCheck
 */
module.exports = testSQLConnection;
