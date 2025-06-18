// Importación de módulos y configuraciones necesarias
const axios = require('../../../config/proxy'); // Configuración del proxy para solicitudes HTTP
const logger = require('../../logger'); // Logger personalizado para registrar eventos
const config = require('../../../config/config'); // Configuración personalizada del proyecto

/**
 * @file Utilidad para obtener feriados desde una API externa.
 * Este módulo gestiona la obtención de feriados desde una API externa, con soporte
 * para reintentos en caso de fallos y tiempos de espera configurables.
 * 
 * @module diasHabiles
 */

/**
 * Determina el entorno actual y carga las variables de entorno desde el archivo correspondiente.
 * 
 * - `entorno`: Entorno de ejecución (por defecto: 'development').
 * - `apiFeriados`: URL de la API para obtener feriados.
 * - `apiIntervalo`: Intervalo entre reintentos en milisegundos (por defecto: 5000 ms).
 * - `apiReintentos`: Número máximo de reintentos en caso de fallo (por defecto: 3).
 */
const apiFeriados = config.apiFeriados; // URL de la API de feriados
const apiIntervalo = config.apiIntervalo; // Intervalo entre reintentos
const apiReintentos = config.apiReintentos; // Número de reintentos

// Validar que la URL de la API de feriados esté configurada
if (!apiFeriados) {
    logger.error('❌ La URL de la API de feriados no está configurada en el archivo .env');
    throw new Error('La URL de la API de feriados no está configurada.');
}

/**
 * Función de espera para introducir un retraso entre reintentos.
 * 
 * @function sleep
 * @param {number} ms - Tiempo de espera en milisegundos.
 * @returns {Promise<void>} Promesa que se resuelve después del tiempo especificado.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Obtiene los feriados desde una API externa con soporte para reintentos.
 * 
 * Esta función realiza una solicitud HTTP a la API de feriados y, en caso de fallo,
 * reintenta la solicitud según los parámetros configurados.
 * 
 * @async
 * @function obtenerFeriados
 * @returns {Promise<Object>} Datos de los feriados obtenidos desde la API.
 * 
 * @throws {Error} Si no se puede obtener los feriados después de varios intentos.
 * 
 * @example
 * const feriados = await obtenerFeriados();
 * console.log(feriados);
 */
const obtenerFeriados = async () => {
    let response = null;
    let attempts = 0;

    while (attempts < apiReintentos) {
        try {
            logger.info(`[INFO] Intentando obtener feriados desde la API (Intento ${attempts + 1})`);
            response = await axios.get(apiFeriados); // Realizar la solicitud HTTP
            logger.info('[INFO] Feriados obtenidos exitosamente desde la API');
            break; // Salir del bucle si la solicitud fue exitosa
        } catch (error) {
            attempts++;
            if (attempts < apiReintentos) {
                logger.warn(`[WARN] Intento ${attempts} fallido. Reintentando en ${apiIntervalo / 1000} segundos...`);
                await sleep(apiIntervalo); // Esperar antes de reintentar
            } else {
                logger.error(`❌ No se pudo obtener los feriados después de ${apiReintentos} intentos: ${error.message}`);
                throw new Error('No se pudo obtener los feriados después de varios intentos.');
            }
        }
    }

    return response.data; // Retornar los datos obtenidos de la API
};

/**
 * Exporta la función `obtenerFeriados` para ser utilizada en otros módulos.
 * 
 * Este módulo permite obtener feriados desde una API externa con soporte para
 * reintentos y tiempos de espera configurables.
 * 
 * @exports obtenerFeriados
 */
module.exports = { obtenerFeriados };