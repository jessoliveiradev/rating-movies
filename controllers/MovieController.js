const { Movie } = require('../models');

exports.createMovie = async (req, res) => {
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

    const { name, description, director, genre } = req.body;

    const newMovie = await Movie.create({ name, description, director, genre });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    res.status(500).json({ error: 'Erro ao criar filme' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.destroy({ where: { id } });
    if (deletedMovie === 1) {
      res.status(200).json({ message: 'Filme excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Filme não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir filme:', error);
    res.status(500).json({ error: 'Erro ao excluir filme' });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    console.error('Erro ao listar filmes:', error);
    res.status(500).json({ error: 'Erro ao listar filmes' });
  }
};