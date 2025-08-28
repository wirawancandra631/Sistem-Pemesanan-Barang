'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('table_price_grosir', {
      id_grosir: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "table_product",
          key: "id_product"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      min_qty: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      price_grosir: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('table_price_grosir');
  }
};