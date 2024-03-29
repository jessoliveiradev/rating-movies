const { Rating } = require('../models');

exports.createRating = async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: 'Token JWT ausente. Você precisa estar autenticado para acessar esta rota.' });
      }

      const authToken = token.split(' ')[1];
      const decodedToken = jwt.verify(authToken, config['development'].jwt_secret_key);
      const { classify, movieId } = req.body;
      const userId = decodedToken.userId;
  
      const newRating = await Rating.create({ classify, userId, movieId });
      res.status(201).json(newRating);
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      res.status(500).json({ error: 'Erro ao criar avaliação' });
    }
  };