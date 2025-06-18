// Importación de dependencias necesarias
const { sql, pool } = require('../../../config/db/sql/db_sql'); // Configuración de la base de datos (pool de conexiones)
const { obtenerFeriados } = require('../../../infrastructure/external/feriados/diasHabiles'); // Importar la función obtenerFeriados
const logger = require('../../../infrastructure/logger'); // Logger personalizado para registrar eventos

/**
 * @file Repositorio para manejar la lógica de acceso a datos relacionada con feriados.
 * Este módulo interactúa con la base de datos y APIs externas para gestionar
 * la obtención, carga y consulta de feriados.
 * 
 * @module feriadosRepository
 */

/**
 * Obtiene todos los feriados desde una API externa.
 * 
 * @async
 * @function obtenerFeriados
 * @returns {Promise<Object>} Un objeto que contiene una lista de feriados.
 * 
 * @throws {Error} Si ocurre un error al obtener los feriados.
 */
exports.obtenerFeriados = async () => {
    try {
        const feriados = await obtenerFeriados();
        return { feriados };
    } catch (error) {
        logger.error(`Error al obtener los feriados: ${error}`);
        throw error;
    }
};

/**
 * Carga nuevos feriados en la base de datos.
 * 
 * @async
 * @function cargarFeriados
 * @param {Array} feriados - Lista de feriados a cargar.
 * @returns {Promise<void>}
 * 
 * @throws {Error} Si ocurre un error al cargar los feriados.
 */
exports.cargarFeriados = async (feriados) => {
    logger.info('⏳ Iniciando la carga de feriados');
    let transaction;
    try {
        const poolConnection = await pool.connect();
        transaction = new sql.Transaction(poolConnection);
        await transaction.begin();

        for (const feriado of feriados) {
            const { date, title, type, inalienable, extra } = feriado;
            logger.info(`Procesando feriado: ${date}`);

            // Verificar si el tipo de feriado ya existe
            const tipoFeriadoResult = await new sql.Request(transaction)
                .input('type', sql.NVarChar, type)
                .input('extra', sql.NVarChar, extra)
                .query('SELECT IdTipoFeriado FROM Tipo_Feriado WHERE Nombre = @type AND Descripcion = @extra');

            let idTipoFeriado;
            if (tipoFeriadoResult.recordset.length === 0) {
                // Insertar nuevo tipo de feriado
                const insertResult = await new sql.Request(transaction)
                    .input('type', sql.NVarChar, type)
                    .input('extra', sql.NVarChar, extra)
                    .query('INSERT INTO Tipo_Feriado (Nombre, Descripcion, FechaCreacion) OUTPUT INSERTED.IdTipoFeriado VALUES (@type, @extra, GETDATE())');
                idTipoFeriado = insertResult.recordset[0].IdTipoFeriado;
                logger.info('Tipo de feriado insertado');
            } else {
                idTipoFeriado = tipoFeriadoResult.recordset[0].IdTipoFeriado;
            }

            // Verificar si el feriado ya existe
            const feriadoExistente = await new sql.Request(transaction)
                .input('date', sql.Date, date)
                .query('SELECT IdFeriado FROM Feriado WHERE Fecha = @date');

            if (feriadoExistente.recordset.length === 0) {
                // Insertar nuevo feriado
                await new sql.Request(transaction)
                    .input('date', sql.Date, date)
                    .input('title', sql.NVarChar, title)
                    .input('idTipoFeriado', sql.Int, idTipoFeriado)
                    .input('inalienable', sql.Bit, inalienable ? 1 : 0)
                    .query('INSERT INTO Feriado (Fecha, Titulo, IdTipoFeriado, Irrenunciable) VALUES (@date, @title, @idTipoFeriado, @inalienable)');
                logger.info(`Feriado insertado: ${date}`);
            } else {
                logger.info(`Feriado ya existe: ${date}`);
            }
        }

        await transaction.commit();
        logger.info('Carga de feriados completada.');
    } catch (error) {
        if (transaction) await transaction.rollback();
        logger.error(`Error al cargar los feriados: ${error}`);
        throw error;
    } finally {
        if (pool) pool.close();
        logger.info('🔌❌ Conexión a la base de datos liberada.');
    }
};

/**
 * Obtiene los feriados legales desde la base de datos.
 * 
 * @async
 * @function obtenerFeriadosLegales
 * @returns {Promise<Object>} Un objeto que contiene una lista de feriados legales.
 * 
 * @throws {Error} Si ocurre un error al obtener los feriados legales.
 */
exports.obtenerFeriadosLegales = async () => {
    const currentDate = new Date().toLocaleString();
    logger.info(`🔌 ⏳ ${currentDate} | API | ObtenerFeriadosLegales: Obteniendo feriados legales`);
    try {
        const poolConnection = await pool.connect();
        const result = await new sql.Request(poolConnection).query(`
            SELECT 
                F.Fecha AS date, 
                F.Titulo AS title, 
                TF.Nombre AS type, 
                F.Irrenunciable AS inalienable, 
                TF.Descripcion AS extra
            FROM Feriado F
            JOIN Tipo_Feriado TF ON F.IdTipoFeriado = TF.IdTipoFeriado
        `);

        const feriados = result.recordset.map(row => ({
            date: row.date.toISOString().split('T')[0],
            title: row.title,
            type: row.type,
            inalienable: row.inalienable,
            extra: row.extra
        }));

        return { status: 'success', data: feriados };
    } catch (error) {
        logger.error(`Error al obtener los feriados legales: ${error}`);
        throw error;
    } finally {
        if (pool) pool.close();
        logger.info(`🔌 ❌ ${currentDate} | API | ObtenerFeriadosLegales: Conexión a la base de datos liberada.`);
    }
};