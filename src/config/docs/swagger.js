// Importación de módulos y configuraciones necesarias
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('../config'); // Configuración personalizada del proyecto

/**
 * @file Configuración de Swagger para la documentación de la API.
 * Este módulo configura Swagger para generar la documentación de la API,
 * utilizando las variables de entorno para definir la información del servidor,
 * las rutas y otros detalles importantes.
 * 
 * @module swaggerConfig
 */

/**
 * Variables de entorno para configurar Swagger.
 * 
 * - `hostDominio`: Dominio del servidor (por defecto: 'http://localhost').
 * - `basePath`: Ruta base de la API (por defecto: '/api').
 * - `env`: Entorno de ejecución (por defecto: 'development').
 * - `title`: Título de la aplicación (por defecto: 'Sistema General').
 */
const hostDominio = config.url_site;
const basePath = config.base_api;
const env = config.modo_entorno_env;
const title = config.title_app;

/**
 * Definición de la documentación de Swagger con autenticación Bearer JWT.
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: `${title}`,
    version: '1.0.0',
    description: `

Esta arquitectura implementa una versión moderna y escalable de **Clean Architecture** combinada con los principios de **Hexagonal Architecture (Ports & Adapters)**, diseñada específicamente para aplicaciones backend en **Node.js** utilizando **Express 5**.

---

## 🎯 Descripción técnica

La estructura está completamente modularizada por **contextos funcionales**, facilitando la escalabilidad, mantenibilidad y separación de responsabilidades:

- 🔌 Adaptadores de entrada: **routes/** y **controllers/**
- 🧠 Lógica de negocio: **domain/services/** y **domain/models/**
- 🔁 Puertos del dominio: **domain/repositories/**
- 🧱 Adaptadores de salida: **infrastructure/external/**, **openai**, **sendgrid**
- ⚙️ Configuración y utilidades compartidas en **config/** y **shared/**

---

## 🚀 Características principales

- ✅ Backend con Node.js v22.15.0 y Express 5
- 🧱 Arquitectura limpia (Clean Architecture) + Hexagonal
- 🛢️ Conectividad con **MySQL** o **SQL Server**
- 📄 Documentación OpenAPI 3.0 interactiva con **Swagger UI**
- 📦 Carga de archivos con **Multer**
- ☁️ Integración con **Azure Blob Storage**
- 📧 Envío de correos vía **SendGrid**
- 🌐 Solicitudes HTTP con **Axios**
- 🔒 Autenticación con **jsonwebtoken**
- 🐳 Contenedores con **Docker** y despliegue con **Kubernetes**
- 🛠️ Linting con **ESLint**
- 📝 Logs estructurados con **Winston**
- 🌍 Configuración por entorno con **dotenv**
- 🔄 Soporte completo para **CORS**
- 🗄️ Parsing de solicitudes con **body-parser**
- 🤖 Integración con **OpenAI**
- 📅 Tareas programadas con **node-cron**
- 🕒 Manejo de zonas horarias con **moment-timezone**
- 🛡️ Seguridad con **helmet** y **express-rate-limit**
- 🧹 Sanitizado contra XSS con **express-xss-sanitizer**
- 🔑 Utilidades de cifrado con **crypto**

---

## 👤 Contacto
- **Soporte Técnico**: [eliasalmarza25@gmail.com](mailto:eliasalmarza25@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/elias-almarza-kackschis/)

---

## ⚠️ Licencia
**Licencia MIT**
    `,
    contact: {
      name: 'Soporte Técnico',
      email: 'eliasalmarza25@gmail.com',
      url: 'https://www.linkedin.com/in/elias-almarza-kackschis/'
    },
    license: {
      name: 'Licencia MIT - Todos los derechos reservados',
      url: 'mailto:eliasalmarza25@gmail.com'
    }
  },
  servers: [
    {
      url: `${hostDominio}${basePath}`,
      description: `Servidor de ${env}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingrese el token JWT en el formato: Bearer <token>',
      },
    },
  },
  // security: [{ bearerAuth: [] }],
};

/**
 * Opciones de Swagger para leer anotaciones desde los controladores.
 */
const options = {
  swaggerDefinition,
  apis: ['./src/controllers/*/*.js'], // Cambia según cómo tengas agrupado controllers
};

/**
 * Genera y exporta la especificación Swagger.
 * 
 * @type {Object}
 */
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
