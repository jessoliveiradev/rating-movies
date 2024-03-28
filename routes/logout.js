const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

router.post('/logout', authenticateJWT, authController.logout);

module.exports = router;