const logger = require('../../infrastructure/logger');

exports.saludar = (req, res) => {
  logger.info('GET /saludo fue invocado');
  res.json({ mensaje: 'Hola desde el logger profesional!' });
};

exports.errorSimulado = (req, res) => {
  try {
    throw new Error('Simulación de error');
  } catch (err) {
    logger.error(`Error capturado: ${err.message}`);
    res.status(500).json({ error: 'Algo salió mal' });
  }
};
