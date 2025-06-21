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


exports.obtenerImagenPorRaza = async (req, res) => {
    try {
        const Id = req.params.id;

        if (!Id) {
            return res.status(400).json({ message: 'El parámetro Id es requerido' });
        }

        const imagenRaza = await dogService.obtenerImagenPorRaza(Id);

        if (!imagenRaza) {
            return res.status(404).json({ message: 'No se encontró una imagen para la raza con ese ID' });
        }

        res.json(imagenRaza);
    } catch (error) {
        logger.error('Error al obtener la Imagen por Raza:', error);
        res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
    }
};
