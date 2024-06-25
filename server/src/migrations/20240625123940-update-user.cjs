'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'firstname',{
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Users', 'lastname',{
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.removeColumn('Users', 'username');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
