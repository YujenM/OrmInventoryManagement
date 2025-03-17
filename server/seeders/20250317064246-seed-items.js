'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      {
        name: 'Laptop',
        description: 'A high-performance laptop',
        price: 1200.999,
        stock: 10,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        price: 799.999,
        stock: 20,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Headphones',
        description: 'Wireless noise-canceling headphones',
        price: 199.999,
        stock: 15,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
