const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const UserController = require('../controllers/UserController');

router.route('/')
  .get(authenticateJWT, UserController.getAllUsers)
  .post(authenticateJWT, UserController.createUser);

router.route('/:id')
  .get(authenticateJWT, UserController.getUser)
  .put(authenticateJWT, UserController.updateUser)
  .delete(authenticateJWT, UserController.deleteUser);

module.exports = router;
