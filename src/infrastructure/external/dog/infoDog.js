// Importación de módulos y configuraciones necesarias
const axios = require('../../../config/proxy'); // Configuración del proxy para solicitudes HTTP
const logger = require('../../logger'); // Logger personalizado para registrar eventos
const config = require('../../../config/config'); // Configuración personalizada del proyecto


// Importación de módulos y configuraciones necesarias
const axios = require('../../../config/proxy'); // Configuración del proxy para solicitudes HTTP
const logger = require('../../logger'); // Logger personalizado para registrar eventos
const config = require('../../../config/config'); // Configuración personalizada del proyecto


const apiTheDog = config.apiTheDog; // URL de la API de TheDogApi
const apiIntervalo = config.apiIntervalo; // Intervalo entre reintentos
const apiReintentos = config.apiReintentos; // Número de reintentos


// Validar que la URL de la API de TheApiDog esté configurada
if (!apiTheDog) {
    logger.error('❌ La URL de la API de TheApiDog no está configurada en el archivo .env');
    throw new Error('La URL de la API de TheApiDogno está configurada.');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const obtenerDatosCaninos = async () => {
    let response = null;
    let attempts = 0;

    while (attempts < apiReintentos) {
        try {
            logger.info(`[INFO] Intentando obtener información desde la API (Intento ${attempts + 1})`);
            response = await axios.get(apiFeriados); // Realizar la solicitud HTTP
            logger.info('[INFO] Información obtenidos exitosamente desde la API');
            break; // Salir del bucle si la solicitud fue exitosa
        } catch (error) {
            attempts++;
            if (attempts < apiReintentos) {
                logger.warn(`[WARN] Intento ${attempts} fallido. Reintentando en ${apiIntervalo / 1000} segundos...`);
                await sleep(apiIntervalo); // Esperar antes de reintentar
            } else {
                logger.error(`❌ No se pudo obtener la información  después de ${apiReintentos} intentos: ${error.message}`);
                throw new Error('No se pudo obtener la información después de varios intentos.');
            }
        }
    }

    return response.data; // Retornar los datos obtenidos de la API
};

module.exports = { obtenerDatosCaninos };