// Importar el repositorio de nutrición
const nutricionRepository = require('../../repositories/openai/nutricionRepository');

/**
 * @file Servicio para manejar la lógica de negocio relacionada con planes alimenticios.
 * Este módulo actúa como intermediario entre los controladores y los repositorios,
 * encapsulando la lógica de negocio y asegurando la separación de responsabilidades.
 * 
 * @module nutricionService
 */

/**
 * Genera un plan alimenticio personalizado basado en los datos del usuario.
 * 
 * @async
 * @function calcularDieta
 * @param {Object} datosUsuario - Datos personales y objetivo del usuario.
 * @param {number} datosUsuario.edad - Edad del usuario.
 * @param {string} datosUsuario.sexo - Sexo del usuario (por ejemplo, 'masculino' o 'femenino').
 * @param {number} datosUsuario.peso - Peso del usuario en kilogramos.
 * @param {number} datosUsuario.altura - Altura del usuario en centímetros.
 * @param {string} datosUsuario.actividad - Nivel de actividad física del usuario (por ejemplo, 'sedentario', 'activo').
 * @param {string} datosUsuario.objetivo - Objetivo del usuario (por ejemplo, 'perder peso', 'ganar músculo').
 * @returns {Promise<string>} Plan alimenticio en formato texto.
 * 
 * @throws {Error} Si ocurre un error al generar el plan alimenticio.
 * 
 * @example
 * const plan = await calcularDieta({
 *     edad: 30,
 *     sexo: 'masculino',
 *     peso: 70,
 *     altura: 175,
 *     actividad: 'activo',
 *     objetivo: 'ganar músculo'
 * });
 * console.log(plan);
 */
exports.calcularDieta = async (datosUsuario) => {
    try {
        return await nutricionRepository.generarPlanDieta(datosUsuario);
    } catch (error) {
        throw new Error(`Error al calcular la dieta: ${error.message}`);
    }
};