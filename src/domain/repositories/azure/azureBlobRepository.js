// Importación de dependencias necesarias
const { BlobServiceClient } = require('@azure/storage-blob'); // Cliente de Azure Blob Storage
const logger = require('../../../infrastructure/logger'); // Logger personalizado para registrar eventos

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

/**
 * Sube un archivo al contenedor de Azure Blob Storage.
 * 
 * @async
 * @function subirArchivo
 * @param {string} containerName - Nombre del contenedor.
 * @param {string} blobName - Nombre del archivo en el contenedor.
 * @param {Buffer} content - Contenido del archivo.
 * @returns {Promise<void>}
 */
exports.subirArchivo = async (containerName, blobName, content) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(content, content.length);
        logger.info(`Archivo ${blobName} subido exitosamente al contenedor ${containerName}`);
    } catch (error) {
        logger.error(`Error al subir archivo: ${error.message}`);
        throw new Error('No se pudo subir el archivo.');
    }
};

/**
 * Descarga un archivo desde Azure Blob Storage.
 * 
 * @async
 * @function descargarArchivo
 * @param {string} containerName - Nombre del contenedor.
 * @param {string} blobName - Nombre del archivo en el contenedor.
 * @returns {Promise<Buffer>} Contenido del archivo descargado.
 */
exports.descargarArchivo = async (containerName, blobName) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
        logger.info(`Archivo ${blobName} descargado exitosamente del contenedor ${containerName}`);
        return downloaded;
    } catch (error) {
        logger.error(`Error al descargar archivo: ${error.message}`);
        throw new Error('No se pudo descargar el archivo.');
    }
};

// Helper para convertir un stream a un buffer
async function streamToBuffer(readableStream) {
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}