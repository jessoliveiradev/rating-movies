const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

router.post('/', authenticateJWT, authController.logout);

module.exports = router;