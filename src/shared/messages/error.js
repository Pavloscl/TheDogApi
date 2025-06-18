/**
 * @file error.js
 * @module shared/messages/error
 * 
 * Este módulo contiene mensajes estándar para los errores que pueden ocurrir en la aplicación.
 * Los mensajes están organizados por contexto y se utilizan para proporcionar respuestas
 * claras y consistentes en caso de errores.
 * 
 * 🚨 Mejora la claridad y consistencia en el manejo de errores.
 * 📚 Centraliza los mensajes de error para facilitar su mantenimiento.
 */

module.exports = {
    /**
     * Mensaje de error cuando un usuario no es encontrado en el sistema.
     */
    USER_NOT_FOUND: 'El usuario no existe en el sistema.',

    /**
     * Mensaje de error cuando el token proporcionado no es válido o ha expirado.
     */
    INVALID_TOKEN: 'El token proporcionado no es válido o ha expirado.',

    /**
     * Mensaje de error cuando faltan campos requeridos en una solicitud.
     */
    MISSING_FIELDS: 'Faltan campos requeridos en la solicitud.',

    /**
     * Mensaje de error cuando no se puede establecer conexión con la base de datos.
     */
    DB_CONNECTION_FAIL: 'No se pudo establecer conexión con la base de datos.',

    /**
     * Mensaje de error cuando ocurre un problema al comunicarse con el servicio de OpenAI.
     */
    OPENAI_ERROR: 'Error al comunicarse con el servicio de OpenAI.',

    /**
     * Mensaje de error cuando el usuario no tiene permisos para realizar una acción.
     */
    PERMISSION_DENIED: 'No tienes permisos para realizar esta acción.',

    /**
     * Mensaje de error cuando se intenta acceder a un recurso que no existe.
     */
    RESOURCE_NOT_FOUND: 'El recurso solicitado no existe.',

    /**
     * Mensaje de error cuando ocurre un error inesperado en el servidor.
     */
    SERVER_ERROR: 'Ocurrió un error inesperado en el servidor. Por favor, inténtalo más tarde.',

    /**
     * Mensaje de error cuando se excede el límite de solicitudes permitidas.
     */
    RATE_LIMIT_EXCEEDED: 'Has excedido el límite de solicitudes. Por favor, inténtalo más tarde.',

    /**
     * Mensaje de error cuando los datos proporcionados no cumplen con las validaciones requeridas.
     */
    VALIDATION_ERROR: 'Los datos proporcionados no son válidos.',

    /**
     * Mensaje de error cuando ocurre un problema al cargar un archivo.
     */
    FILE_UPLOAD_ERROR: 'Error al cargar el archivo. Por favor, verifica el formato y tamaño.',

    /**
     * Mensaje de error cuando se intenta acceder a un servicio externo y falla.
     */
    EXTERNAL_SERVICE_ERROR: 'Error al comunicarse con un servicio externo. Por favor, inténtalo más tarde.'
};