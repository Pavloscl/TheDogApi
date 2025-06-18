module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === 'CLAVE123') {
    next();
  } else {
    res.status(401).json({ error: '🚫 Acceso denegado: token inválido o faltante.' });
  }
};
