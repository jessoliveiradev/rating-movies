const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const MovieController = require('../controllers/MovieController');

router.route('/')
  .get(authenticateJWT, MovieController.getAllMovies)
  .post(authenticateJWT, MovieController.createMovie);

router.route('/:id')
  .delete(authenticateJWT, MovieController.deleteMovie);

module.exports = router;