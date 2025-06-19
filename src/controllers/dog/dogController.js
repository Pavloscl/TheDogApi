// Importación de módulos y configuraciones necesarias
const dogService = require('../../domain/services/dog/dogService'); // Servicio de  caninos para invocar métodos de feriados
const logger = require('../../infrastructure/logger'); // Logger personalizado para registrar eventos
const httpMessages = require('../../shared/messages/http'); // Mensajes estándar HTTP


exports.obtenerDatosCaninos = async (req, res) => {
    try {
        const datosCaninos = await dogService.obtenerDatosCaninos();
        res.json(datosCaninos);
    } catch (error) {
        logger.error('Error al obtener datos caninos:', error);
        res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
    }
};