// Importar el repositorio de feriados
const feriadosRepository = require('../../repositories/feriado/feriadosRepository');

/**
 * @file Servicio para manejar la lógica de negocio relacionada con feriados legales.
 * Este módulo actúa como intermediario entre los controladores y los repositorios,
 * encapsulando la lógica de negocio y asegurando la separación de responsabilidades.
 * 
 * @module feriadosService
 */

/**
 * Obtiene la lista de feriados legales desde una API externa.
 * 
 * @async
 * @function obtenerFeriados
 * @returns {Promise<any>} Lista de feriados legales obtenidos desde la API externa.
 * 
 * @throws {Error} Si ocurre un error al obtener los feriados.
 * 
 * @example
 * const feriados = await obtenerFeriados();
 * console.log(feriados);
 */
exports.obtenerFeriados = async () => {
    try {
        return await feriadosRepository.obtenerFeriados();
    } catch (error) {
        throw new Error(`Error al obtener feriados: ${error.message}`);
    }
};

/**
 * Carga una lista de feriados legales en la base de datos.
 * 
 * @async
 * @function cargarFeriados
 * @param {Array} feriados - Lista de feriados legales a cargar.
 * @returns {Promise<any>} Resultado de la operación de carga.
 * 
 * @throws {Error} Si ocurre un error al cargar los feriados.
 * 
 * @example
 * const resultado = await cargarFeriados(listaFeriados);
 * console.log(resultado);
 */
exports.cargarFeriados = async (feriados) => {
    try {
        return await feriadosRepository.cargarFeriados(feriados);
    } catch (error) {
        throw new Error(`Error al cargar feriados: ${error.message}`);
    }
};

/**
 * Obtiene la lista de feriados legales almacenados en la base de datos.
 * 
 * @async
 * @function obtenerFeriadosLegales
 * @returns {Promise<any>} Lista de feriados legales almacenados.
 * 
 * @throws {Error} Si ocurre un error al obtener los feriados legales.
 * 
 * @example
 * const feriadosLegales = await obtenerFeriadosLegales();
 * console.log(feriadosLegales);
 */
exports.obtenerFeriadosLegales = async () => {
    try {
        return await feriadosRepository.obtenerFeriadosLegales();
    } catch (error) {
        throw new Error(`Error al obtener feriados legales: ${error.message}`);
    }
};