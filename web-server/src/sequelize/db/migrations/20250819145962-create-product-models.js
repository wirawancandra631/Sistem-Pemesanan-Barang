'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('table_product', {
      id_product: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku_product: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name_product: {
        type: DataTypes.STRING,
        allowNull: false
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "table_brand_product",
          key: "id_brand",
        },
        onUpdate: "cascade",
        onDelete: "set null"
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "table_category_product",
          key: "id_category"
        },
        onUpdate: "cascade",
        onDelete: "set null"
      },
      stock_product: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      price_sell: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      display_product: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },

      display_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },

      recomendation_product: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      image_product: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description_product: {
        type: DataTypes.TEXT,
        allowNull: false
      },

    }, {

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('table_product');
  }
};