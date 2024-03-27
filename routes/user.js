const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const UserController = require('../controllers/UserController');

router.get('/', authenticateJWT, UserController.getAllUsers);

router.post('/', authenticateJWT, UserController.createUser);

router.put('/:id', authenticateJWT, UserController.updateUser);

router.delete('/:id', authenticateJWT, UserController.deleteUser);

module.exports = router;
