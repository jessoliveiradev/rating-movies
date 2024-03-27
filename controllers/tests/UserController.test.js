const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../UserController');
const { User } = require('../../models');

const req = {
  headers: {
    authorization: 'Bearer token'
  },
  body: {
    username: 'testuser',
    role: 'ADMIN',
    password: 'testpassword'
  },
  params: {
    id: '1'
  }
};
const res = {
  status: jest.fn(() => res),
  json: jest.fn()
};

const mockUser = {
  id: 1,
  username: 'testuser',
  role: 'ADMIN',
  password: '$2b$10$mt7ac...'
};

User.findOne = jest.fn().mockResolvedValue(mockUser);

User.create = jest.fn().mockResolvedValue(mockUser);

User.update = jest.fn().mockResolvedValue([1]);

User.destroy = jest.fn().mockResolvedValue(1);

User.findAll = jest.fn().mockResolvedValue([mockUser]);

bcrypt.hash = jest.fn().mockResolvedValue('hashed_password');

jwt.sign = jest.fn().mockReturnValue('mocked_token');
jwt.verify = jest.fn().mockReturnValue({ role: 'ADMIN' });

describe('UserController', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuário atualizado com sucesso' });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuário excluído com sucesso' });
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockUser]);
    });
  });
});
