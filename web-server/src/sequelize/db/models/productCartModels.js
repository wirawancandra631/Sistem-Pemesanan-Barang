'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCartModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCartModels.belongsTo(models.ProductModels, {
        foreignKey: "product_id",
        as: "products"
      })
      // define association here
    }
  }
  ProductCartModels.init({
    id_cart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCartModels',
    tableName: "table_product_cart",
    timestamps: false
  });
  return ProductCartModels;
};