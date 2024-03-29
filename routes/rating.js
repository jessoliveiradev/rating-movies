const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const RatingController = require('../controllers/RatingController');

router.route('/')
  .post(authenticateJWT, RatingController.createRating);

module.exports = router;