const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const userModel = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const config = require('./config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

const User = userModel(sequelize, Sequelize);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.post('/users', async (req, res) => {
  try {
    const { username, role } = req.body;
    const newUser = await User.create({ username, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
