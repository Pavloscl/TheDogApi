const express = require('express');
const router = express.Router();
const controller = require('../../controllers/mysql/mysqlController');

router.get('/mysql', controller.listarUsuarios);

module.exports = router;

