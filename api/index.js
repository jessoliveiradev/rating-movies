const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const ratingRoutes = require('./routes/rating');
const logoutRouter = require('./routes/logout');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const swaggerDefinition = {
  info: {
    title: "Rating Movies",
    version: "1.0.00",
    description: "This is a simple project for rating films, built with Node.js, Express and MySQL, using Sequelize as the ORM."
  },
  components: {
    schemas: require('./schemas.json')
  }
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsDoc(options);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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
