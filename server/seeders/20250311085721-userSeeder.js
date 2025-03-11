'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;

    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        address: '123 Main St',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('securepass', saltRounds),
        address: '456 Elm St',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: await bcrypt.hash('testpass', saltRounds),
        address: '789 Oak St',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
