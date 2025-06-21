
// Importación de módulos y configuraciones necesarias
const axios = require('../../../config/proxy'); // Configuración del proxy para solicitudes HTTP
const logger = require('../../logger'); // Logger personalizado para registrar eventos
const config = require('../../../config/config'); // Configuración personalizada del proyecto

const apiDogBase = config.apiDogBase;// URL de la Base de la API de TheDogApi
const apiTheDog= config.apiTheDog; // URL de la API de TheDogApi
const apiDogImagenes = config.apiTheDogImagenes; // URL de la API de TheDogApi que entrega Imagenes
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
            logger.info(`[INFO] Intentando obtener información de Raza desde la API (Intento ${attempts + 1})`);
            response =  await axios.get(`${apiDogBase}/breeds`); // Realizar la solicitud HTTP
            logger.info('[INFO] Información de Raza obtenidos exitosamente desde la API');
            break; // Salir del bucle si la solicitud fue exitosa
        } catch (error) {
            attempts++;
            if (attempts < apiReintentos) {
                logger.warn(`[WARN] Intento ${attempts} fallido. Reintentando en ${apiIntervalo / 1000} segundos...`);
                await sleep(apiIntervalo); // Esperar antes de reintentar
            } else {
                logger.error(`❌ No se pudo obtener la información  de Raza después de ${apiReintentos} intentos: ${error.message}`);
                throw new Error('No se pudo obtener la información  de Raza después de varios intentos.');
            }
        }
    }

    return response.data; // Retornar los datos obtenidos de la API
};



/**
 * Obtener una imagen aleatoria de una raza según su ID
 * @param {string} breedId - ID de la raza de perro
 */
const obtenerImagenPorRaza = async (breedId) => {
    if (!breedId) {
        throw new Error('El ID de la raza es requerido');
    }

    let response = null;
    let attempts = 0;

    while (attempts < apiReintentos) {
        try {
            logger.info(`[INFO] Intentando obtener imagen para breed_id=${breedId} (Intento ${attempts + 1})`);
            response = await axios.get(`${apiDogBase}/images/search?breed_id=${breedId}`);
            logger.info('[INFO] Imagen obtenida exitosamente desde la API');
            break;
        } catch (error) {
            attempts++;
            if (attempts < apiReintentos) {
                logger.warn(`[WARN] Intento ${attempts} fallido. Reintentando en ${apiIntervalo / 1000} segundos...`);
                await sleep(apiIntervalo);
            } else {
                logger.error(`❌ No se pudo obtener la imagen después de ${apiReintentos} intentos: ${error.message}`);
                throw new Error('No se pudo obtener la imagen después de varios intentos.');
            }
        }
    }

    return response.data[0]; // Devuelve la primera imagen encontrada
};

module.exports = { obtenerDatosCaninos,obtenerImagenPorRaza };