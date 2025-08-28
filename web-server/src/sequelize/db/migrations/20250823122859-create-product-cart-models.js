'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('table_product_cart', {
      id_cart: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "table_customer",
          key: "id_customer"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "table_product",
          key: "id_product"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('table_product_cart');
  }
};