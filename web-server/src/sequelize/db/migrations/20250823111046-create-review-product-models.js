'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('table_review_product', {
      id_review: {
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
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "table_product",
          key: "id_product"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      publish_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('table_review_product');
  }
};