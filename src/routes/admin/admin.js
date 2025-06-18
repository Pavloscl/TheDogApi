const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const authMiddleware = require('../../middleware/admin/authMiddleware');

router.get('/info', authMiddleware, adminController.getAdminInfo);

module.exports = router;
