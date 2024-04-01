const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/logout', authController.logout);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operações relacionadas à autenticação de usuários
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Realiza o logout de um usuário
 *     description: Realiza o logout de um usuário autenticado.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout bem-sucedido
 *       500:
 *         description: Erro interno do servidor
 */
