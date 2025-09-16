'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          author: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          year: {
            type: Sequelize.FLOAT,
            allowNull: false,
          },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};
