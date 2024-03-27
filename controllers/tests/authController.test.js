const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = require('../authController');
const { User } = require('../../models');

const req = {
  body: {
    username: 'testuser',
    password: 'testpassword'
  }
};
const res = {
  status: jest.fn(() => res),
  json: jest.fn()
};

const mockUser = {
  id: 1,
  username: 'testuser',
  password: '$2b$10$mt7ac...',
  role: 'USER'
};

User.findOne = jest.fn().mockResolvedValue(mockUser);

bcrypt.compare = jest.fn().mockResolvedValue(true);

jwt.sign = jest.fn().mockReturnValue('mocked_token');

describe('authController', () => {
  it('should return a token when login is successful', async () => {
    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'mocked_token' });
  });

  it('should return an error message when username or password is invalid', async () => {
    User.findOne.mockResolvedValue(null);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nome de usuário ou senha inválidos' });
  });

  it('should return an error message when password is invalid', async () => {
    bcrypt.compare.mockResolvedValue(false);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nome de usuário ou senha inválidos' });
  });

  it('should return an error message when an unexpected error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('Unexpected error'));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao autenticar usuário' });
  });
});