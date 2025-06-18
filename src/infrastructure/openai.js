// Importar dependencias necesarias
const OpenAI = require('openai'); // Cliente de OpenAI
const config = require('../config/config'); // Configuración personalizada del proyecto

/**
 * Clase OpenAIClient
 * Encapsula la configuración y creación del cliente de OpenAI.
 * 
 * Esta clase sigue el principio de responsabilidad única (SRP) al encargarse únicamente
 * de inicializar y gestionar la instancia del cliente de OpenAI.
 */
class OpenAIClient {
  /**
   * Constructor de la clase OpenAIClient.
   * Inicializa el cliente de OpenAI con la clave API proporcionada en la configuración.
   */
  constructor() {
    if (!config.apiKeyOpenIa) {
      throw new Error(
        'La clave API de OpenAI no está configurada. Asegúrate de definir "apiKeyOpenIa" en el archivo de configuración.'
      );
    }

    this.client = new OpenAI({
      apiKey: config.apiKeyOpenIa, // Clave API obtenida desde la configuración
    });
  }

  /**
   * Obtiene la instancia del cliente de OpenAI.
   * 
   * @returns {OpenAI} Instancia configurada del cliente de OpenAI.
   */
  getClient() {
    return this.client;
  }
}

/**
 * Exporta una instancia única del cliente de OpenAI.
 * 
 * Esto asegura que se utilice un único cliente en toda la aplicación,
 * siguiendo el patrón Singleton.
 */
module.exports = new OpenAIClient().getClient();