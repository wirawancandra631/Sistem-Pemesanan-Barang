'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerModels.hasOne(models.CustomerMemberModels, {
        foreignKey: "customer_id",
        as: "member"
      })
      // define association here
    }
  }
  CustomerModels.init({
    id_customer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_customer: DataTypes.STRING,
    number_phone: DataTypes.STRING,
    password: DataTypes.STRING,
    profil_picture: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CustomerModels',
    tableName: "table_customer",
    timestamps: false
  });
  return CustomerModels;
};