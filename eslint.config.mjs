import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Configuración para los archivos JS en la carpeta src
  {
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // Establece CommonJS como el tipo de módulo
    },
    rules: {
      "no-console": "warn", // Muestra advertencias si se usa console.log()
      "no-unused-vars": "warn", // Muestra advertencias por variables no usadas
      "semi": ["error", "always"], // Exige el uso de punto y coma al final de las líneas
      "quotes": ["error", "single"], // Exige comillas simples para las cadenas
    },
  },
  // Configuración global para el navegador (si es necesario para tu proyecto)
  {
    languageOptions: {
      globals: globals.browser, // Permite el uso de variables globales del navegador
    },
  },
  // Configuración para los archivos de entorno de pruebas (si los usas)
  {
    files: ["src/**/*.test.js", "src/**/*.spec.js"],
    rules: {
      "no-console": "off", // Deshabilita la regla de no-console en pruebas
      "no-unused-vars": "off", // Deshabilita la regla de no-unused-vars en pruebas
    },
  },
];
