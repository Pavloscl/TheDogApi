const pool = require('./mysql');
const logger = require('../../infrastructure/logger');

/**
 * @file mysqlHealthCheck.js
 * @description Prueba de conexión a MySQL para verificar la disponibilidad de la base de datos.
 */

/**
 * Realiza una verificación activa de conexión a la base de datos.
 * Ideal para utilizar en endpoints de health-check o al iniciar la app.
 *
 * @async
 * @function testMysqlConnection
 * @returns {Promise<boolean>} `true` si la conexión es exitosa, `false` si falla.
 */
async function testMysqlConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    logger.info('✅ Conexión a MySQL verificada correctamente.');
    connection.release();
    return true;
  } catch (err) {
    logger.error('❌ Falló la conexión a MySQL:', err.message);
    return false;
  }
}

/**
 * Exporta la prueba de conexión.
 * 
 * Esta funcion se utiliza para probar la conectividad a la base de datos MySQL.
 * 
 * @module mysqlHealthCheck
 */
module.exports = testMysqlConnection;
