const { flujoAsincrono } = require('../../domain/services/flujo/flujoService');

// Controlador usando async/await
exports.obtenerFlujoOrdenado = async (req, res) => {
  try {
    const resultado = await flujoAsincrono();
    res.json({ proceso: resultado });
  } catch (error) {
    console.error('❌ Error en el flujo:', error);
    res.status(500).json({ error: 'Ocurrió un error en el flujo asincrónico' });
  }
};
