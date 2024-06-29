'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          id: 2,
          firstname: 'John',
          lastname: 'Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    },
  };