'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('table_category_product', {
      id_category: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      icon_category: {
        type: DataTypes.STRING,
        allowNull: true
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('table_category_product');
  }
};