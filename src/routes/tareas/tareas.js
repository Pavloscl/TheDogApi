const express = require('express');
const router = express.Router();
const tareasController = require('../../controllers/tareas/tareasController');

/**
 * Rutas para la gestión de tareas.
 * GET    /tareas        - Obtiene todas las tareas.
 * POST   /tareas        - Crea una nueva tarea.
 * PUT    /tareas/:id    - Actualiza una tarea existente.
 * DELETE /tareas/:id    - Elimina una tarea.
 */

router.get('/tareas', tareasController.obtenerTareas);
router.post('/tareas', tareasController.crearTarea);
router.put('/tareas/:id', tareasController.actualizarTarea);
router.delete('/tareas/:id', tareasController.eliminarTarea);

module.exports = router;