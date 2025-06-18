const db = require('../../../config/db/mysql/db_mysql'); // Importa la configuración de la base de datos MySQL

async function obtenerUsuarios() {
  const result = await db.query('SELECT * FROM usuarios');
  return result.rows;
}

module.exports = { obtenerUsuarios };
