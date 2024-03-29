const jwt = require('jsonwebtoken');
const {
  createMovie,
  getAllMovies,
  deleteMovie
} = require('../MovieController');
const { Movie } = require('../../models');


const req = {
  headers: {
    authorization: 'Bearer token'
  },
  body: {
    name: 'Movie Name',
    description: 'Movie Description',
    director: 'Movie Director',
    genre: 'Movie Genre'
  },
  params: {
    id: 1
  }
};

const res = {
  status: jest.fn(() => res),
  json: jest.fn()
};

const createdMovie = {
  id: 1,
  name: 'Test Name',
  description: 'Test Description',
  director: 'Test Director',
  genre: 'Test Genre'
};

Movie.findOne = jest.fn().mockResolvedValue(createdMovie);

Movie.create = jest.fn().mockResolvedValue(createdMovie);

Movie.destroy = jest.fn().mockResolvedValue(1);

Movie.findAll = jest.fn().mockResolvedValue([createdMovie]);

jwt.sign = jest.fn().mockReturnValue('mocked_token');
jwt.verify = jest.fn().mockReturnValue({ role: 'ADMIN' });

describe('Movie Controller', () => {
  describe('createMovie', () => {
    it('should create a new movie', async () => {
      await createMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdMovie);
    });
  });

  describe('deleteMovie', () => {
    it('should delete an existing movie', async () => {
      await deleteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Filme excluído com sucesso' });
    });
  });

  describe('getAllMovies', () => {
    it('should get all movies', async () => {
      await getAllMovies(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([createdMovie]);
    });
  });
});

