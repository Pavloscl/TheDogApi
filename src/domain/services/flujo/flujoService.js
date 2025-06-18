function flujoAsincrono() {
  return new Promise((resolve) => {
    const pasos = ['Inicio de flujo'];

    setTimeout(() => {
      pasos.push('Operación intermedia (esperó 2s)');
      pasos.push('Fin del flujo');
      resolve(pasos);
    }, 2000);
  });
}

module.exports = { flujoAsincrono };
