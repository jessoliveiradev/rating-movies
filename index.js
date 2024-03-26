const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const config = require('./config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.use('/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
