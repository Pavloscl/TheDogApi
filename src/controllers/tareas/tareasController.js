const tareasService = require('../../domain/services/tareas/tareasService');

/**
 * Obtiene todas las tareas.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await tareasService.obtenerTodas();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas: ',error });
  }
};

/**
 * Crea una nueva tarea.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.crearTarea = async (req, res) => {
  try {
    const { id, titulo } = req.body;
    if (!id || !titulo) {
      return res.status(400).json({ error: 'Los campos "id" y "titulo" son requeridos' });
    }
    const nueva = await tareasService.crear(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea: ',error });
  }
};

/**
 * Actualiza una tarea existente.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await tareasService.actualizar(req.params.id, req.body);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea: ',error });
  }
};

/**
 * Elimina una tarea.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.eliminarTarea = async (req, res) => {
  try {
    const resultado = await tareasService.eliminar(req.params.id);
    if (!resultado) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea: ',error });
  }
};