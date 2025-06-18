/**
 * @file validation.js
 * @module shared/messages/validation
 * 
 * Este módulo contiene mensajes estándar para las validaciones de datos en la aplicación.
 * Los mensajes están organizados por contexto y se utilizan para proporcionar respuestas
 * claras y consistentes en caso de errores de validación.
 * 
 * 🚨 Mejora la claridad y consistencia en los mensajes de validación.
 * 📚 Centraliza los mensajes de validación para facilitar su mantenimiento.
 */

module.exports = {
    /**
     * Mensaje de validación cuando el campo de email es obligatorio.
     */
    REQUIRED_EMAIL: 'El campo email es obligatorio.',

    /**
     * Mensaje de validación cuando el email no tiene un formato válido.
     */
    INVALID_EMAIL: 'El email no tiene un formato válido.',

    /**
     * Mensaje de validación cuando el campo de contraseña es obligatorio.
     */
    REQUIRED_PASSWORD: 'El campo contraseña es obligatorio.',

    /**
     * Mensaje de validación cuando la contraseña no cumple con la longitud mínima requerida.
     */
    PASSWORD_LENGTH: 'La contraseña debe tener al menos 6 caracteres.',

    /**
     * Mensaje de validación cuando el nombre de usuario es obligatorio.
     */
    REQUIRED_USERNAME: 'El campo nombre de usuario es obligatorio.',

    /**
     * Mensaje de validación cuando el nombre de usuario excede la longitud máxima permitida.
     */
    USERNAME_TOO_LONG: 'El nombre de usuario no debe exceder los 50 caracteres.',

    /**
     * Mensaje de validación cuando un campo requerido está vacío.
     */
    REQUIRED_FIELD: (field) => `El campo ${field} es obligatorio.`,

    /**
     * Mensaje de validación cuando un valor numérico está fuera del rango permitido.
     */
    NUMBER_OUT_OF_RANGE: (min, max) => `El valor debe estar entre ${min} y ${max}.`,

    /**
     * Mensaje de validación cuando un archivo no cumple con el tamaño máximo permitido.
     */
    FILE_TOO_LARGE: 'El archivo excede el tamaño máximo permitido.',

    /**
     * Mensaje de validación cuando el tipo de archivo no es válido.
     */
    INVALID_FILE_TYPE: 'El tipo de archivo no es válido.',

    /**
     * Mensaje de validación cuando un campo contiene caracteres no permitidos.
     */
    INVALID_CHARACTERS: 'El campo contiene caracteres no permitidos.',

    /**
     * Mensaje de validación cuando una fecha no tiene un formato válido.
     */
    INVALID_DATE: 'La fecha no tiene un formato válido.',

    /**
     * Mensaje de validación cuando un valor no es único (por ejemplo, un email ya registrado).
     */
    DUPLICATE_VALUE: (field) => `El valor del campo ${field} ya está registrado.`,

    /**
     * Mensaje de validación cuando un campo no cumple con un patrón específico.
     */
    INVALID_PATTERN: (field) => `El campo ${field} no cumple con el formato requerido.`,

    /**
     * Mensaje de validación cuando un token de autenticación es inválido o ha expirado.
     */
    INVALID_AUTH_TOKEN: 'El token de autenticación no es válido o ha expirado.',

    /**
     * Mensaje de validación cuando un campo supera la longitud máxima permitida.
     */
    FIELD_TOO_LONG: (field, maxLength) => `El campo ${field} no debe exceder los ${maxLength} caracteres.`,

    /**
     * Mensaje de validación cuando un campo no cumple con la longitud mínima requerida.
     */
    FIELD_TOO_SHORT: (field, minLength) => `El campo ${field} debe tener al menos ${minLength} caracteres.`,

    /**
     * Mensaje de validación cuando un campo no es un número válido.
     */
    INVALID_NUMBER: 'El valor debe ser un número válido.',

    /**
     * Mensaje de validación cuando un campo no es una URL válida.
     */
    INVALID_URL: 'El campo debe contener una URL válida.'
};