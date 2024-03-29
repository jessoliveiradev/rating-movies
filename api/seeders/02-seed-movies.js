'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Movies', [
      {
        id: 1,
        name: 'Example Movie 1',
        description: 'Description of the example movie 1',
        director: 'Director of the example movie 1',
        genre: 'Genre of the example movie 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Example Movie 2',
        description: 'Description of the example movie 2',
        director: 'Director of the example movie 2',
        genre: 'Genre of the example movie 2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
