'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ratings', [
      {
        id: 1,
        classify: 4,
        userId: 1,
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        classify: 3,
        userId: 2,
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ratings', null, {});
  }
};
