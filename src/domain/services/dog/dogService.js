// Importar el repositorio dog
const dogRepository = require('../../repositories/dog/dogRepository');

exports.obtenerDatosCaninos = async () => {
    try {
        return await dogRepository.obtenerDatosCaninos();
    } catch (error) {
        throw new Error(`Error al obtener datos caninos: ${error.message}`);
    }
};


exports.obtenerImagenPorRaza = async (Id) => {
    try {
        if (!Id) {
            throw new Error('Debe proporcionar un Id');
        }
        return await dogRepository.obtenerImagenPorRaza(Id);
    } catch (error) {
        throw new Error(`Error al obtener imagen por raza: ${error.message}`);
    }
};