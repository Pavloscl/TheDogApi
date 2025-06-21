const { sql, pool } = require('../../../config/db/sql/db_sql'); // Configuración de la base de datos (pool de conexiones)
const { obtenerDatosCaninos,obtenerImagenPorRaza } = require('../../../infrastructure/external/dog/infoDog'); // Importar la función obtenerDataCaninos
const logger = require('../../../infrastructure/logger'); // Logger personalizado para registrar eventos


exports.obtenerDatosCaninos = async () => {
    try {
        const datosCaninos = await obtenerDatosCaninos();
        return { datosCaninos };
    } catch (error) {
        logger.error(`Error al obtener Datos Caninos: ${error}`);
        throw error;
    }
};


exports.obtenerImagenPorRaza = async (Id) => {
    try {
        if (!Id) {
            throw new Error('Debe proporcionar un Id');
        }
        const imagen = await obtenerImagenPorRaza(Id);
        return { imagen };
    } catch (error) {
        logger.error(`Error al obtener imagen de la raza ${Id}: ${error}`);
        throw error;
    }
};