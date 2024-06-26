const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config.json');

exports.createUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token JWT ausente. Você precisa estar autenticado para acessar esta rota.' });
    }

    const authToken = token.split(' ')[1];
    const decodedToken = jwt.verify(authToken, config['development'].jwt_secret_key);
    
    if (decodedToken.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Permissão negada. Apenas usuários com a função ADMIN podem cadastrar novos usuários.' });
    }

    const { username, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, role, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token JWT ausente. Você precisa estar autenticado para acessar esta rota.' });
    }

    const authToken = token.split(' ')[1];
    const decodedToken = jwt.verify(authToken, config['development'].jwt_secret_key);

    const { id } = req.params;
    const { username, role, password } = req.body;

    if (decodedToken.role === 'USER' && decodedToken.userId !== parseInt(id)) {
      return res.status(403).json({ error: 'Permissão negada. Você não tem permissão para alterar este usuário.' });
    }

    if (decodedToken.role === 'ADMIN') {
      const updatedUser = await User.update({ username, role }, { where: { id } });
      if (updatedUser[0] === 1) {
        return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      } else {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
    }

    if (decodedToken.role === 'USER') {
      if (role) {
        return res.status(403).json({ error: 'Permissão negada. Você não tem permissão para alterar a role.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.update({ username, password: hashedPassword }, { where: { id } });

      if (updatedUser[0] === 1) {
        console.log(updatedUser[0]);
        return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      } else {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({ where: { id } });
    if (deletedUser === 1) {
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};
