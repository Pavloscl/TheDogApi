// Importar el repositorio dog
const dogRepository = require('../../repositories/dog/dogRepository');

exports.obtenerDatosCaninos = async () => {
    try {
        return await dogRepository.obtenerDatosCaninos();
    } catch (error) {
        throw new Error(`Error al obtener datos caninos: ${error.message}`);
    }
};
