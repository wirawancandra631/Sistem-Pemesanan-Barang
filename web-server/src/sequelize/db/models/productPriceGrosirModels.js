'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductPriceGrosirModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductPriceGrosirModels.init({
    id_grosir: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    product_id: DataTypes.INTEGER,
    min_qty: DataTypes.INTEGER,
    price_grosir: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ProductPriceGrosirModels',
    tableName: "table_price_grosir",
    timestamps: false
  });
  return ProductPriceGrosirModels;
};