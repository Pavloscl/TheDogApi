// // Importación de módulos y configuraciones necesarias
// const dogService = require('../../domain/services/dog/dogService'); // Servicio de  caninos para invocar métodos de feriados
// const logger = require('../../infrastructure/logger'); // Logger personalizado para registrar eventos
// const httpMessages = require('../../shared/messages/http'); // Mensajes estándar HTTP

// /**
//  * @swagger
//  * /ObtenerListadoCanino:
//  *   get:
//  *     summary: Obtiene un listado de razas caninas
//  *     description: Obtiene información sobre diferentes razas caninas desde una API externa.
//  *     tags: [Dog]
//  *     parameters:
//  *       - in: query
//  *         name: raza
//  *         schema:
//  *           type: string
//  *         required: false
//  *         description: Nombre de la raza canina a buscar
//  *     responses:
//  *       200:
//  *         description: Lista de perros obtenidos
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *       401:
//  *         description: No autorizado
//  *       500:
//  *         description: Error interno del servidor
//  */
// /**
//  * Controlador para obtener datos de razas caninas.
//  * 
//  * @async
//  * @function obtenerDatosCaninos
//  * @param {Object} req - Objeto de solicitud HTTP.
//  * @param {Object} res - Objeto de respuesta HTTP.
//  * @returns {Promise<void>}
//  */
// exports.obtenerDatosCaninos = async (req, res) => {
//     try {
//         const datosCaninos = await dogService.obtenerDatosCaninos();
//         res.json(datosCaninos);
//     } catch (error) {
//         logger.error('Error al obtener datos caninos:', error);
//         res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
//     }
// };

// /**
//  * @swagger
//  * /ObtenerImagenPorRaza/{id}:
//  *   get:
//  *     summary: Obtiene una imagen de una raza canina específica
//  *     description: Retorna una imagen desde la API externa correspondiente al ID de la raza canina.
//  *     tags: [Dog]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID de la raza canina
//  *     responses:
//  *       200:
//  *         description: Imagen obtenida correctamente
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 url:
//  *                   type: string
//  *                   example: "https://api.com/imagen.jpg"
//  *       400:
//  *         description: El parámetro ID es requerido
//  *       404:
//  *         description: No se encontró una imagen para el ID indicado
//  *       500:
//  *         description: Error interno del servidor
//  */
// /**
//  * Controlador para obtener imagen de una raza canina específica.
//  * 
//  * @async
//  * @function obtenerImagenPorRaza
//  * @param {Object} req - Objeto de solicitud HTTP.
//  * @param {Object} res - Objeto de respuesta HTTP.
//  * @returns {Promise<void>}
//  */
// exports.obtenerImagenPorRaza = async (req, res) => {
//     try {
//         const Id = req.params.id;

//         if (!Id) {
//             return res.status(400).json({ message: 'El parámetro Id es requerido' });
//         }

//         const imagenRaza = await dogService.obtenerImagenPorRaza(Id);

//         if (!imagenRaza) {
//             return res.status(404).json({ message: 'No se encontró una imagen para la raza con ese ID' });
//         }

//         res.json(imagenRaza);
//     } catch (error) {
//         logger.error('Error al obtener la Imagen por Raza:', error);
//         res.status(500).json({ message: httpMessages.INTERNAL_ERROR + ': ' + error.message });
//     }
// };





const perrosService = require('../../domain/services/dog/dogService');
const logger = require('../../infrastructure/logger');
const dogLogger = require('../../infrastructure/dogLogger');
const fs = require('fs');
const path = require('path');

const FAVORITOS_FILE = path.resolve(__dirname, '../../../data/razas_favoritas.json');
const DELETE_LOG_FILE = path.resolve(__dirname, '../../../data/delete/usuario/razas.json');

// Asegurarse de que existan archivos/directorios
if (!fs.existsSync(path.dirname(FAVORITOS_FILE))) fs.mkdirSync(path.dirname(FAVORITOS_FILE), { recursive: true });
if (!fs.existsSync(FAVORITOS_FILE)) fs.writeFileSync(FAVORITOS_FILE, '[]');

/**
 * @swagger
 * /dog/listarRazas:
 *   get:
 *     summary: Consulta todas las razas disponibles.
 *     description: Obtiene todas las razas de TheDogAPI, con cache local opcional.
 *     tags: [Informacion Canina]
 *     responses:
 *       200:
 *         description: Lista de razas de perros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   origin:
 *                     type: string
 *                   temperament:
 *                     type: string
 *                   breed_group:
 *                     type: string
 *       500:
 *         description: Error interno del servidor.
 */
/**
 * Controlador para listar razas de perros.
 *
 * @async
 * @function listarRazas
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
exports.listarRazas = async (req, res) => {
  try {
    const razas = await perrosService.getBreeds();
    logger.info('GET /perros/razas');
    dogLogger.info('Se listaron los perros favoritos --> GET /perros/razas ');
    res.json(razas);
  } catch (error) {
    logger.error('Error listarRazas:', error);
    dogLogger.info(' Error -> GET /perros/razas ');
    res.status(500).json({ message: 'Error interno' });
  }
};

/**
 * @swagger
 * /dog/imagen/{id}:
 *   get:
 *     summary: Obtiene una imagen de una raza canina específica.
 *     description: Retorna una imagen desde la API externa correspondiente al ID de la raza canina.
 *     tags: [Informacion Canina]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la raza canina
 *     responses:
 *       200:
 *         description: Imagen obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 image_url:
 *                   type: string
 *                   example: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
 *       400:
 *         description: El parámetro ID es inválido
 *       404:
 *         description: No se encontró una imagen para el ID indicado
 *       500:
 *         description: Error interno del servidor
 */
/**
 * Controlador para obtener imagen de una raza canina específica.
 *
 * @async
 * @function obtenerImagenRaza
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
exports.obtenerImagenRaza = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) 
    return res.status(400).json({ message: 'ID inválido' });
  try {
    const imagen = await perrosService.getImageByBreed(id);
    if (!imagen) return res.status(404).json({ message: 'Imagen no encontrada' });
    logger.info(`GET /perros/imagen/${id}`);
    dogLogger.info(` Se ha realizado la búsqueda de  la imagen por raza id ${id}  --> GET /perros/imagen/${id}`)
    res.json(imagen);
  } catch (error) {
    logger.error('Error obtenerImagenRaza:', error);
       logger.info(` Error -> GET /perros/imagen/${id}`);
    res.status(500).json({ message: 'Error interno' });
  }
};

//método que obtiene la información completa de la raza más su imagen.
exports.obtenerInformacionRazaPorId = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) 
    return res.status(400).json({ message: 'ID inválido' });
  try {
    const info = await perrosService.getFullBreedInfoById(id);
    if (!info) return res.status(404).json({ message: 'Información no encontrada' });
    logger.info(`GET /perros/informacionRaza/${id}`);
    dogLogger.info(` Se ha realizado la búsqueda de  la información completa  por raza id ${id}  --> GET /perros/imagen/${id}`)
    res.json(info);
  } catch (error) {
    logger.error('Error obtenerInfoCompleta:', error);
       logger.info(` Error -> GET /perros/informacionRaza/${id}`);
    res.status(500).json({ message: 'Error interno' });
  }
};




/**
 * @swagger
 * /dog/favoritos:
 *   post:
 *     summary: Agrega una raza a favoritos.
 *     description: Añade la raza al archivo local de favoritos.
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Beagle"
 *     responses:
 *       201:
 *         description: Raza agregada exitosamente.
 *       400:
 *         description: Dato inválido, duplicado o límite de 6 alcanzado.
 */
/**
 * Controlador para agregar una raza a favoritos.
 *
 * @function agregarFavorito
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
exports.agregarFavorito = (req, res) => {
  const { id, name } = req.body;
  let favoritos = JSON.parse(fs.readFileSync(FAVORITOS_FILE));
  if (favoritos.find(f => f.id === id || f.name === name)) {
    return res.status(400).json({ message: 'Ya existe en favoritos' });
  }
  if (favoritos.length >= 6) {
    return res.status(400).json({ message: 'Máximo 6 favoritos alcanzado' });
  }
  favoritos.push({ id, name, addedAt: new Date().toISOString() });
  fs.writeFileSync(FAVORITOS_FILE, JSON.stringify(favoritos, null, 2));
  logger.info(`POST /usuario/perros/favoritos - ${id || name}`);
  dogLogger.info(`Se Agrego a la lista de  favoritos ${id || name} --> POST /usuario/perros/favoritos - ${id || name}`);
  res.status(201).json({ message: 'Agregado a favoritos' });
};

/**
 * @swagger
 * /dog/favoritos:
 *   get:
 *     summary: Obtiene la lista de razas favoritas.
 *     tags: [Favoritos]
 *     responses:
 *       200:
 *         description: Lista de favoritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   addedAt:
 *                     type: string
 */
/**
 * Controlador para listar todas las razas favoritas.
 *
 * @function listarFavoritos
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
exports.listarFavoritos = (req, res) => {
  const favoritos = JSON.parse(fs.readFileSync(FAVORITOS_FILE));
  logger.info('GET /perros/favoritos');
  dogLogger.info(`Se Listaros los perros Favoritos --> GET /perros/favoritos`);
  res.json(favoritos);
};

/**
 * @swagger
 * /dog/favoritos/{id}:
 *   delete:
 *     summary: Elimina una raza favorita.
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la raza a eliminar de favoritos.
 *     responses:
 *       200:
 *         description: Eliminación exitosa.
 *       404:
 *         description: Favorito no encontrado.
 */
/**
 * Controlador para eliminar una raza favorita por ID.
 *
 * @function eliminarFavorito
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
exports.eliminarFavorito = (req, res) => {
  const id = parseInt(req.params.id, 10);
  let favoritos = JSON.parse(fs.readFileSync(FAVORITOS_FILE));
  const index = favoritos.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).json({ message: 'No encontrado' });
  const [removed] = favoritos.splice(index, 1);
  fs.writeFileSync(FAVORITOS_FILE, JSON.stringify(favoritos, null, 2));
  // registro de eliminación
  const deleteLog = fs.existsSync(DELETE_LOG_FILE)
    ? JSON.parse(fs.readFileSync(DELETE_LOG_FILE))
    : [];
  deleteLog.push({ id: removed.id, name: removed.name, deletedAt: new Date().toISOString() });
  fs.mkdirSync(path.dirname(DELETE_LOG_FILE), { recursive: true });
  fs.writeFileSync(DELETE_LOG_FILE, JSON.stringify(deleteLog, null, 2));
  logger.info(`DELETE /usuario/perros/favoritos/${id}`);
  dogLogger.info(` Se elimino de la lista de favoritos el id ${id} --> DELETE /usuario/perros/favoritos/${id}`);
  res.json({ message: 'Eliminado correctamente' });
};

/**
 * @swagger
 * /dog/topPerros3:
 *   get:
 *     summary: Retorna las 3 razas más populares entre los usuarios.
 *     tags: [Dog]
 *     responses:
 *       200:
 *         description: Lista de las tres razas favoritas más frecuentes.
 */
/**
 * Controlador para obtener el top 3 de razas favoritas.
 *
 * @function top3Favoritas
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
exports.top3Favoritas = (req, res) => {
  const favoritos = JSON.parse(fs.readFileSync(FAVORITOS_FILE));
  // contar ocurrencias (aquí asumimos que cada favorito se agrega una vez)
  const top3 = favoritos.slice(-3); // ejemplo simple: últimos 3
  logger.info('GET /perros/top3');
  dogLogger.info(`Se ha obtenido los top 3 Favoritos ${top3} --> GET /perros/top3`);
  res.json(top3);
};

