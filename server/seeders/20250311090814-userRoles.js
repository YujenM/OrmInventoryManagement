'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userRoles', [
      {
        userId: 1,
        roleId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        roleId: 2, // admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        roleId: 3, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userRoles', null, {});
  }
};
