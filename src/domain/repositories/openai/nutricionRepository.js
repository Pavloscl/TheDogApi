// Importación de dependencias necesarias
const openai = require('../../../infrastructure/openai'); // Configuración de OpenAI
const logger = require('../../../infrastructure/logger'); // Logger personalizado para registrar eventos

/**
 * @file Repositorio para manejar la lógica de acceso a datos relacionada con planes nutricionales.
 * Este módulo interactúa con la API de OpenAI para generar planes alimenticios personalizados
 * basados en los datos proporcionados por el usuario.
 * 
 * @module nutricionRepository
 */

/**
 * Genera un plan alimenticio personalizado utilizando OpenAI.
 * 
 * @async
 * @function generarPlanDieta
 * @param {Object} datosUsuario - Datos personales y objetivo del usuario.
 * @param {number} datosUsuario.edad - Edad del usuario.
 * @param {string} datosUsuario.sexo - Sexo del usuario (por ejemplo, 'masculino' o 'femenino').
 * @param {number} datosUsuario.peso - Peso del usuario en kilogramos.
 * @param {number} datosUsuario.altura - Altura del usuario en centímetros.
 * @param {string} datosUsuario.actividad - Nivel de actividad física del usuario (por ejemplo, 'sedentario', 'activo').
 * @param {string} datosUsuario.objetivo - Objetivo del usuario (por ejemplo, 'perder peso', 'ganar músculo').
 * @returns {Promise<string>} Plan alimenticio generado en formato texto.
 * 
 * @throws {Error} Si ocurre un error al llamar a la API de OpenAI.
 * 
 * @example
 * const plan = await generarPlanDieta({
 *   edad: 30,
 *   sexo: 'masculino',
 *   peso: 70,
 *   altura: 175,
 *   actividad: 'activo',
 *   objetivo: 'ganar músculo'
 * });
 * console.log(plan);
 */
exports.generarPlanDieta = async (datosUsuario) => {
    const { edad, sexo, peso, altura, actividad, objetivo } = datosUsuario;

    // Crear el prompt para OpenAI
    const prompt = `
Eres un nutricionista profesional. Crea una dieta personalizada para la siguiente persona:

Edad: ${edad}
Sexo: ${sexo}
Peso: ${peso} kg
Altura: ${altura} cm
Nivel de actividad física: ${actividad}
Objetivo: ${objetivo}

Entrega el plan diario dividido en desayuno, almuerzo, cena y snacks. Asegúrate de que los alimentos sean equilibrados y explica brevemente el razonamiento nutricional detrás del plan.
    `.trim();

    try {
        logger.info('⏳ Enviando solicitud a OpenAI para generar el plan alimenticio...');
        
        // Llamar a la API de OpenAI para generar el plan alimenticio
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{
                role: 'user',
                content: prompt,
            }],
        });
  
        const plan = completion.choices[0].message.content;
        logger.info('✅ Plan alimenticio generado exitosamente.');

        return plan;
    } catch (error) {
        logger.error('❌ Error llamando a OpenAI:', error);
        throw new Error('Error al generar el plan alimenticio. Por favor, inténtelo de nuevo más tarde.');
    }
};