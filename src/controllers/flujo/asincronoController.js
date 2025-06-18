const servicio = require('../../domain/services/flujo/asincronoService');

exports.getAsincrono = async (req, res) => {
  const resultado = await servicio.flujoAsincrono();
  console.log('[ASINCRONO] =>', resultado);
  res.json({ tipo: 'asincrono', pasos: resultado });
};