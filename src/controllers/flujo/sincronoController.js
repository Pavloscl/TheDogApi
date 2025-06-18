const servicio = require('../../domain/services/flujo/sincronoService');

exports.getSincrono = (req, res) => {
  const resultado = servicio.flujoSincrono();
  console.log('[SINCRONO] =>', resultado);
  res.json({ tipo: 'sincrono', pasos: resultado });
};
