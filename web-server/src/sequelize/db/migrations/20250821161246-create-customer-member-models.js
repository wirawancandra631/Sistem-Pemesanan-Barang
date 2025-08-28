'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('table_customer_member', {
      id_member: {
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
      member_type: {
        type: DataTypes.ENUM(["GOLD", "MITRA"]),
        defaultValue: "GOLD",
        allowNull: false
      },
      member_point: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      last_updated: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('table_customer_member');
  }
};