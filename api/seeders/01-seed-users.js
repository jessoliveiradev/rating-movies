'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('senha123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'admin',
        role: 'ADMIN',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        username: 'user',
        role: 'USER',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
