const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const MovieController = require('../controllers/MovieController');

router.route('/')
  .get(authenticateJWT, MovieController.getAllMovies)
  .post(authenticateJWT, MovieController.createMovie);

router.route('/:id')
  .get(authenticateJWT, MovieController.getMovie)
  .delete(authenticateJWT, MovieController.deleteMovie);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Operações relacionadas a filmes
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retorna todos os filmes
 *     description: Retorna uma lista de todos os filmes cadastrados.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de filmes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Cria um novo filme
 *     description: Cria um novo filme com as informações fornecidas.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMovie'
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Token JWT ausente
 *       403:
 *         description: Permissão negada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Retorna um filme pelo ID
 *     description: Retorna as informações de um filme específico pelo ID fornecido.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Filme encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Exclui um filme pelo ID
 *     description: Exclui um filme específico pelo ID fornecido.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Filme excluído com sucesso
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
