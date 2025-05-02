'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      {
        name: 'Laptop',
        description: 'A high-performance laptop',
        price: 1200.999,
        stock: 10,
        userId: 2,
        itemImage:"https://res.cloudinary.com/dbozigpgf/image/upload/v1745908149/image-coming-soon-icon-isolated-260nw-2568601883_rpmpjj.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        price: 799.999,
        stock: 20,
        userId: 2,
        itemImage:"https://res.cloudinary.com/dbozigpgf/image/upload/v1745908149/image-coming-soon-icon-isolated-260nw-2568601883_rpmpjj.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Headphones',
        description: 'Wireless noise-canceling headphones',
        price: 199.999,
        stock: 15,
        userId: 2,
        itemImage:"https://res.cloudinary.com/dbozigpgf/image/upload/v1745908149/image-coming-soon-icon-isolated-260nw-2568601883_rpmpjj.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
