const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

exports.authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token JWT ausente. Você precisa estar autenticado para acessar esta rota.' });
  }

  const authToken = token.split(' ')[1];
  const secretKey = config['development'].jwt_secret_key;

  jwt.verify(authToken, secretKey, (error, decodedToken) => {
    if (error) {
      console.error('Erro ao verificar token JWT:', error);
      return res.status(403).json({ error: 'Token JWT inválido ou expirado' });
    }
    req.user = decodedToken;
    next();
  });
};
