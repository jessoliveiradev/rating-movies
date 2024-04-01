const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const RatingController = require('../controllers/RatingController');

router.route('/')
  .post(authenticateJWT, RatingController.createRating);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Operações relacionadas a avaliações de filmes
 */

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Cria uma nova avaliação
 *     description: Cria uma nova avaliação para um filme com as informações fornecidas.
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRating'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       401:
 *         description: Token JWT ausente
 *       500:
 *         description: Erro interno do servidor
 */
