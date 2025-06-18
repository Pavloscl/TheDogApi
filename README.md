# 🧱 Arquetipo API - Node.js (v22.15.0)

## 📌 Descripción

   Este proyecto es una API backend desarrollada con **Node.js v22.15.0**, siguiendo una arquitectura **modular, escalable y desacoplada**, basada en los principios de **Clean Architecture** y **Hexagonal Architecture (Ports & Adapters)**.

Incluye ejemplos reales y listos para producción con integraciones como OpenAI, SendGrid, Azure Blob Storage, manejo de cron jobs, seguridad, y mucho más.

> ✅ El propósito de este arquetipo es ofrecer una base sólida y reutilizable para nuevos proyectos backend en Node.js.  
> ✅ Sirve como ejemplo documentado para cada componente funcional y servicio externo.  
> ✅ Permite levantar distintos tipos de APIs en minutos con estándares de calidad.  
> ✅ Introduce servicios de inteligencia artificial, email y almacenamiento en APIs funcionales.  
> ✅ Aplica medidas de seguridad modernas como XSS, CORS, rate limiting y JWT.

---

## 🧠 Arquitectura Implementada

### 🏷️ Modular Clean Hex Architecture for Node.js (Express 5 Ready)

Esta arquitectura implementa una versión moderna y profesional de **Clean Architecture** combinada con los principios de **Hexagonal Architecture**, usando JavaScript y Express 5.

### 🧩 Características técnicas clave

- 🧠 Lógica de negocio centralizada en `domain/` (con `models/`, `services/`, `repositories/`)
- 🔌 Adaptadores de entrada: `routes/` y `controllers/` (HTTP layer)
- 🔁 Puertos: `domain/repositories/` definen contratos
- 🧱 Adaptadores de salida: `infrastructure/` conecta con APIs externas, cron jobs, logger, etc.
- ⚙️ Configuración centralizada en `config/` y funciones puras en `shared/`
- ✅ Independiente del framework y desacoplado de detalles técnicos

---

## 🚀 Características Principales

- ✅ Backend con **Node.js v22.14.0** y **Express 5**
- 🧱 Arquitectura limpia (Clean Architecture) + Hexagonal
- 🛢️ Conectividad con **MySQL** o **SQL Server**
- 📄 Documentación OpenAPI 3.0 con **Swagger UI**
- 📦 Carga de archivos con **Multer**
- ☁️ Integración con **Azure Blob Storage**
- 📧 Envío de correos vía **SendGrid**
- 🌐 Solicitudes HTTP con **Axios**
- 🔒 Autenticación con **jsonwebtoken**
- 🐳 Despliegue con **Docker** y **Kubernetes**
- 🛠️ Linting con **ESLint**
- 📝 Logs estructurados con **Winston**
- 🌍 Configuración por entorno con **dotenv**
- 🔄 Soporte para **CORS**
- 🗄️ Parsing con **body-parser**
- 🤖 Integración con **OpenAI**
- 📅 Cron Jobs con **node-cron**
- 🕒 Zonas horarias con **moment-timezone**
- 🛡️ Seguridad con **helmet**
- 🚦 Rate limiting con **express-rate-limit**
- 🧹 Sanitizado con **express-xss-sanitizer**

---

## 🧬 Estructura del Proyecto

```plaintext
📁 uploads/                 → Archivos subidos
📁 src/
 ├── app.js                → Punto de entrada
 ├── 📁 config/            → Configuraciones globales (Swagger, DB, .env, etc.)
 ├── 📁 controllers/       → Adaptadores HTTP entrantes
 ├── 📁 routes/            → Enrutadores Express
 ├── 📁 domain/            → Lógica del negocio
 │   ├── models/           → Entidades del dominio
 │   ├── repositories/     → Puertos de acceso a datos
 │   └── services/         → Casos de uso del dominio
 ├── 📁 infrastructure/    → Adaptadores externos (OpenAI, cron, logs, etc.)
 ├── 📁 middleware/        → Middlewares globales (auth, rate-limit, etc.)
 ├── 📁 shared/            → Funciones puras reutilizables
.env.*                     → Variables de entorno
Dockerfile                 → Imagen Docker
docker-compose.yml         → Orquestación con Docker
kubernetes.yml             → Configuración declarativa de Kubernetes
pipeline-minvu.yml         → Definición de pipeline CI/CD
package.json               → Dependencias y scripts
eslint.config.mjs          → Reglas de ESLint
README.md                  → Este documento


```

## ⚙️ Instalación y Configuración

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clona el repositorio:**

   Autentificarse en Azure DevOps y clonar el repositorio.

2. **Instala las dependencias:**

   ```bash
   npm install

   ```

3. **Configura las variables de entorno:**

   configura los archivo .env.development (o el archivo correspondiente según el entorno).

   ```env
   NODE_ENV=development
   HOST=localhost
   URL_SITE=http://localhost:3001
   BASE_PATH_API=/api
   PORT=3001
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=pass
   DB_NAME=default
   AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=ACCOUNT_NAME;AccountKey=ACCOUNT_KEY;EndpointSuffix=core.windows.net
   AZURE_STORAGE_CONTAINER=CONTENEDOR_NAME
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   SENDGRID_FROM_EMAIL=example@example.cl
   API_FERIADOS=https://api.boostr.cl/feriados/en.json
   JWT_SECRET=d10f8b2c-7e6a-4a1e-9b8c-3f2e6d9a4c5f
   JWT_EXPIRATION=1h
   CRON_EXPRESSION=*/15 * * * *
   CRON_TIMEZONE=America/Santiago
   OPENAI_API_KEY=sk-proj-NmWRLe1ENz
   TITLE_APP=Arquetipo Base para Aplicaciones en Node.js v22.14.0
   API_INTERVALO=5000
   API_REINTENTOS=3
   ALLOWED_ORIGINS=http://localhost:3000
   JSON_LIMIT=10mb
   URLENCODED_LIMIT=10mb
   ENCRYPTION_KEY=4d2f3c7e-8b1a-4c5e-9b8c-3f2e6d9a4c5f
   REQUEST_LIMIT_WINDOWS_MS=60000
   MAX_REQUEST_PER_WINDOWS=100

   ```

4. **Arranca la aplicación:**

   ```bash

   Dependiendo de su sistema operativo, ejecute el siguiente comandos desde su máquina local.

   npm run debug-dev-windows
   npm run debug-dev-linux

   ```

## 📚 Documentación Swagger

   La documentación interactiva de la API estará disponible en la siguiente URL: http://localhost:3000/api-docs

   ---

## 🔍 Calidad del Código

1. **Arrancar ESLint:**

   ESLint se utiliza para mantener la calidad del código. Puedes ejecutar ESLint con el siguiente comando:

   ```bash
   npx eslint .

   ```

   Ejemplo de salida
   C:\Users\ealmarzak\Downloads\arq-api-nodejs-227-ge\src\utils\xxxxxx.js
   13:5 warning Unexpected console statement no-console
   33:17 warning Unexpected console statement no-console

   ✖ 25 problems (0 errors, 25 warnings)

   ---

## 📦 Despliegue

   El proyecto es compatible con despliegue usando contenedores y orquestadores:

   > Docker: construcción de imagen desde el Dockerfile

   > Docker Compose: con docker-compose.yml

   > Kubernetes: configuración declarativa en kubernetes.yml
      
   ---