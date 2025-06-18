const repo = require('../../domain/repositories/mysql/mysqlRepository');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await repo.obtenerUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar usuarios' });
  }
};
