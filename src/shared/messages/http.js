/**
 * @file http.js
 * @module shared/messages/http
 * 
 * Este módulo contiene mensajes estándar para las respuestas HTTP.
 * Los mensajes están organizados por códigos de estado y se utilizan para
 * proporcionar respuestas consistentes en toda la aplicación.
 * 
 * 🚀 Mejora la claridad y consistencia de las respuestas HTTP.
 * 📚 Centraliza los mensajes para facilitar su mantenimiento.
 */

module.exports = {
    /**
     * Mensaje para respuestas exitosas (200 OK).
     * Indica que la operación se realizó correctamente.
     */
    OK: 'Operación realizada correctamente.',

    /**
     * Mensaje para respuestas de creación exitosa (201 Created).
     * Indica que un recurso fue creado exitosamente.
     */
    CREATED: 'Recurso creado exitosamente.',

    /**
     * Mensaje para solicitudes inválidas (400 Bad Request).
     * Indica que la solicitud enviada por el cliente es incorrecta o no válida.
     */
    BAD_REQUEST: 'La solicitud es inválida.',

    /**
     * Mensaje para respuestas de no autorizado (401 Unauthorized).
     * Indica que el cliente no tiene credenciales válidas para acceder al recurso.
     */
    UNAUTHORIZED: 'No autorizado.',

    /**
     * Mensaje para respuestas de acceso denegado (403 Forbidden).
     * Indica que el cliente no tiene permisos para acceder al recurso solicitado.
     */
    FORBIDDEN: 'Acceso denegado.',

    /**
     * Mensaje para respuestas de recurso no encontrado (404 Not Found).
     * Indica que el recurso solicitado no existe o no está disponible.
     */
    NOT_FOUND: 'Recurso no encontrado.',

    /**
     * Mensaje para errores internos del servidor (500 Internal Server Error).
     * Indica que ocurrió un error inesperado en el servidor.
     */
    INTERNAL_ERROR: 'Error interno del servidor.',

    /**
     * Mensaje para respuesta sin contenido (204 No Content).
     */
    NO_CONTENT: 'Sin contenido.',

    /**
     * Mensaje para conflicto de datos (409 Conflict).
     */
    CONFLICT: 'Conflicto al procesar la solicitud.',

    /**
     * Mensaje para error de dependencia fallida (424 Failed Dependency).
     */
    FAILED_DEPENDENCY: 'Dependencia fallida.',

    /**
     * Mensaje para error de servicio externo (502 Bad Gateway).
     */
    BAD_GATEWAY: 'Error de servicio externo.',

};