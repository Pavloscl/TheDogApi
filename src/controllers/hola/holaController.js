const holaService = require('../../domain/services/hola/holaService');

exports.saludar = (req, res) => {
  const saludo = holaService.obtenerSaludo();
  res.json({ mensaje: saludo });
};
