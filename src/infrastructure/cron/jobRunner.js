// Importación de módulos y configuraciones necesarias
const cron = require('node-cron'); // Librería para programar tareas periódicas
const logger = require('../logger'); // Logger personalizado para registrar eventos
const { obtenerFeriados } = require('../../shared/diasHabiles'); // Función para obtener feriados desde la API
const { cargarFeriados } = require('../../repositories/feriadosRepository'); // Función para cargar feriados en la base de datos

/**
 * @file Configuración y ejecución de un cron job para cargar feriados.
 * Este módulo utiliza `node-cron` para programar y ejecutar tareas periódicas
 * relacionadas con la carga de feriados desde una API externa hacia la base de datos.
 * 
 * @module cronJob
 */

/**
 * Configuración del cron job.
 * 
 * - `cronExpression`: Expresión cron para programar la tarea (por defecto, todos los días a medianoche).
 * - `cronTimezone`: Zona horaria para la ejecución del cron job (por defecto, 'America/Santiago').
 */
const cronExpression = config.cronExpression; // Expresión cron
const timezone = config.cronTimezone; // Zona horaria

/**
 * Función principal para ejecutar la carga de feriados.
 * 
 * Esta función realiza los siguientes pasos:
 * 1. Obtiene los feriados desde una API externa.
 * 2. Carga los feriados obtenidos en la base de datos.
 * 3. Libera memoria manualmente si el recolector de basura está disponible.
 * 
 * @async
 * @function ejecutarCargarFeriados
 * @returns {Promise<void>}
 * 
 * @throws {Error} Si ocurre un error durante la ejecución de la tarea.
 */
async function ejecutarCargarFeriados() {
    try {
        logger.info('⏳ Iniciando la carga de feriados desde el cron job');

        // Obtener los feriados desde la API
        const response = await obtenerFeriados();
        const feriados = response.data; // Asegúrate de que los datos sean correctos

        // Cargar los feriados en la base de datos
        await cargarFeriados(feriados);
        logger.info('✅ Estado de carga: OK');

        // Liberar memoria manualmente si es posible
        if (global.gc) {
            global.gc();
            logger.info('🗑️ Memoria liberada manualmente');
        }
    } catch (error) {
        logger.error('❌ Error al cargar feriados desde el cron job:', error);
    }
}

/**
 * Configuración y creación del cron job.
 * 
 * Este cron job se ejecuta según la expresión cron y la zona horaria configuradas.
 * Llama a la función `ejecutarCargarFeriados` para realizar la tarea programada.
 * 
 * @constant
 * @type {cron.ScheduledTask}
 */
const job = cron.schedule(
    cronExpression,
    () => {
        logger.info('⏳ Ejecutando cron job para cargar feriados');
        ejecutarCargarFeriados();
    },
    {
        scheduled: true,
        timezone, // Ajusta la zona horaria según sea necesario
    }
);

/**
 * Inicia el cron job.
 * 
 * Este método asegura que el cron job comience a ejecutarse según la configuración.
 */
job.start();

logger.info(`🕒 Cron job configurado para ejecutarse con la expresión: ${cronExpression} en la zona horaria: ${timezone}`);

/**
 * Exporta el cron job para que pueda ser utilizado o administrado desde otros módulos.
 * 
 * @exports job
 */
module.exports = job;