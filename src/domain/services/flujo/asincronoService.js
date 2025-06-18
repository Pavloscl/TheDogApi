function flujoAsincrono() {
  return new Promise((resolve) => {
    const pasos = ['Paso 1'];
    setTimeout(() => {
      pasos.push('Paso 2 (esperó 2s)');
      resolve(pasos);
    }, 2000);
    pasos.push('Paso 3 (inmediato)');
  });
}
module.exports = { flujoAsincrono };