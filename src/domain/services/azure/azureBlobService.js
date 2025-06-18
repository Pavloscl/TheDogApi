// Importar el repositorio de Azure Blob Storage
const azureBlobRepository = require('../../repositories/azure/azureBlobRepository'); // Importar el repositorio de Azure Blob Storage

/**
 * Sube un archivo al contenedor de Azure Blob Storage.
 * 
 * @async
 * @function subirArchivo
 * @param {string} containerName - Nombre del contenedor.
 * @param {string} blobName - Nombre del archivo.
 * @param {Buffer} content - Contenido del archivo.
 * @returns {Promise<void>}
 */
exports.subirArchivo = async (containerName, blobName, content) => {
    return await azureBlobRepository.subirArchivo(containerName, blobName, content);
};

/**
 * Descarga un archivo desde Azure Blob Storage.
 * 
 * @async
 * @function descargarArchivo
 * @param {string} containerName - Nombre del contenedor.
 * @param {string} blobName - Nombre del archivo.
 * @returns {Promise<Buffer>}
 */
exports.descargarArchivo = async (containerName, blobName) => {
    return await azureBlobRepository.descargarArchivo(containerName, blobName);
};