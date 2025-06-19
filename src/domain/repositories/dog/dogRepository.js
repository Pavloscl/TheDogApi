const { sql, pool } = require('../../../config/db/sql/db_sql'); // Configuración de la base de datos (pool de conexiones)
const { obtenerDatosCaninos } = require('../../../infrastructure/external/dog/infoDog'); // Importar la función obtenerDataCaninos
const logger = require('../../../infrastructure/logger'); // Logger personalizado para registrar eventos


exports.obtenerDatosCaninos = async () => {
    try {
        const datosCaninos = await obtenerDatosCaninos();
        return { datosCaninos };
    } catch (error) {
        logger.error(`Error al obtener los feriados: ${error}`);
        throw error;
    }
};
