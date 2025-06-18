# Usamos la versión ligera de Node.js 22 para reducir el tamaño de la imagen
FROM node:22-alpine AS builder

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos solo los archivos de dependencias para aprovechar la caché
COPY package*.json ./

# Instalamos las dependencias en modo producción
RUN npm ci --only=production

# Copiamos el resto del código de la aplicación
COPY . .

# Construimos la aplicación (si usas TypeScript o necesitas preprocesos, aquí los ejecutas)
# RUN npm run build  # <- Descomenta si usas TypeScript o algún proceso de build

# ---------------------
# Etapa final: solo incluimos lo necesario
# ---------------------
FROM node:22-alpine

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos solo lo necesario desde la imagen de construcción
COPY --from=builder /app /app

# Exponemos el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["node", "src/app.js"]
