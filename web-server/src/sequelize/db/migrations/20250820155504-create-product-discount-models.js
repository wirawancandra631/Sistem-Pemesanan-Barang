"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("table_product_discount", {
      id_discount: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "table_product",
          key: "id_product"
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      amount_discount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0,
      },
      price_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("table_product_discount");
  },
};
