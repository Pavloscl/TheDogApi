/**
 * @file log.js
 * @module shared/messages/log
 * 
 * Este módulo contiene mensajes estándar para los logs de la aplicación.
 * Los mensajes están organizados por contexto y se utilizan para registrar
 * eventos importantes en el sistema.
 * 
 * 🚀 Mejora la claridad y consistencia en los registros de la aplicación.
 * 📚 Centraliza los mensajes de log para facilitar su mantenimiento.
 */

module.exports = {
    /**
     * Mensaje de log cuando la API se inicia correctamente.
     * 
     * @param {number} port - El puerto en el que la API está corriendo.
     * @param {string} env - El entorno en el que se está ejecutando la API (development, production, etc.).
     * @returns {string} Mensaje indicando que la API está corriendo.
     */
    API_STARTED: (port, env) => `🚀 API corriendo en el puerto ${port} [${env}]`,

    /**
     * Mensaje de log cuando la conexión a la base de datos se establece correctamente.
     */
    DB_CONNECTED: 'Conexión a la base de datos establecida.',

    /**
     * Mensaje de log cuando la conexión a la base de datos falla.
     */
    DB_FAILED: 'Falló la conexión a la base de datos.',

    /**
     * Mensaje de log cuando se recibe una solicitud HTTP en una ruta específica.
     * 
     * @param {string} route - La ruta en la que se recibió la solicitud.
     * @returns {string} Mensaje indicando que se recibió una solicitud en la ruta especificada.
     */
    REQUEST_RECEIVED: (route) => `Solicitud recibida en ruta: ${route}`,

    /**
     * Mensaje de log cuando se envía un correo electrónico exitosamente.
     * 
     * @param {string} to - La dirección de correo electrónico del destinatario.
     * @returns {string} Mensaje indicando que el correo fue enviado al destinatario.
     */
    EMAIL_SENT: (to) => `Correo enviado a ${to}`
};