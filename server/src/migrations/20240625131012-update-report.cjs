'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reports', 'title',{
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Reports', 'createdAt',{
      allowNull: false,
      type: Sequelize.DATE
    });

    await queryInterface.addColumn('Reports', 'updatedAt',{
      allowNull: false,
      type: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reports');
  }
};
