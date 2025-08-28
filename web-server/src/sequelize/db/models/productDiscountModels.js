"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDiscountModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductDiscountModels.init(
    {
      id_discount: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: DataTypes.INTEGER,
      amount_discount: DataTypes.DECIMAL(5, 2),
      price_discount: DataTypes.DECIMAL(10, 2),
      end_time: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "ProductDiscountModels",
      tableName: "table_product_discount",
      timestamps: false,
    }
  );
  return ProductDiscountModels;
};
