// Importar el módulo axios para realizar solicitudes HTTP
const axios = require('axios');
const https = require('https'); // Módulo para manejar configuraciones HTTPS

/**
 * @file Configuración de Axios para solicitudes HTTP.
 * Este módulo configura Axios para realizar solicitudes HTTP con soporte opcional
 * para proxies y certificados no válidos. Es útil para entornos donde se requiere
 * un proxy o donde los certificados SSL no son confiables.
 * 
 * @module proxyConfig
 */

/**
 * Configuración opcional del proxy.
 * 
 * Si necesitas usar un proxy para tus solicitudes HTTP, descomenta y configura las siguientes líneas.
 * Asegúrate de reemplazar los valores de `host`, `port`, `username` y `password` con los datos
 * correspondientes a tu entorno.
 */
// axios.defaults.proxy = {
//     host: 'proxy.example.com', // Cambia esto a la dirección de tu proxy
//     port: 8080, // Cambia esto al puerto de tu proxy
//     auth: {
//         username: 'usuario', // Tu nombre de usuario para el proxy
//         password: 'contraseña', // Tu contraseña para el proxy
//     },
// };

/**
 * Configuración para ignorar certificados SSL no válidos.
 * 
 * Si necesitas realizar solicitudes a servidores con certificados no válidos,
 * esta configuración desactiva la verificación de certificados SSL.
 */
axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Ignorar certificados no válidos
});

/**
 * Exporta la instancia de Axios configurada.
 * 
 * Esta instancia puede ser utilizada en toda la aplicación para realizar solicitudes HTTP
 * con la configuración personalizada definida en este módulo.
 * 
 * @exports axios
 */
module.exports = axios;