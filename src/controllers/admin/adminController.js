exports.getAdminInfo = (req, res) => {
  res.json({
    mensaje: '✅ Acceso autorizado. Información sensible del administrador.',
    usuario: 'admin',
    estado: 'activo'
  });
};
