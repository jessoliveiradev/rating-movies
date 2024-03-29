const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const ratingRoutes = require('./routes/rating');
const logoutRouter = require('./routes/logout');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authRoutes);
app.use(logoutRouter);
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/ratings', ratingRoutes);

const config = require('./config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

sequelize.authenticate()
  .then(() => console.log('Conexão bem-sucedida com o banco de dados.'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));