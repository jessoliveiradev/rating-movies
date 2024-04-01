const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operações relacionadas à autenticação de usuários
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Autentica um usuário com as credenciais fornecidas e retorna um token JWT válido.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Nome de usuário ou senha inválidos
 *       500:
 *         description: Erro interno do servidor
 */
