'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductModels.belongsTo(models.BrandProductModels, {
        foreignKey: "brand_id",
        as: "brand"
      })

      ProductModels.belongsTo(models.CategoryProductModels, {
        foreignKey: "category_id",
        as: "category"
      })
      ProductModels.hasMany(models.ProductPriceGrosirModels, {
        foreignKey: "product_id",
        as: "grosir"
      })
      ProductModels.hasOne(models.ProductDiscountModels, {
        foreignKey: "product_id",
        as: "discount"
      })

      // define association here
    }
  }
  ProductModels.init({
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sku_product: DataTypes.STRING,
    name_product: DataTypes.STRING,
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    stock_product: DataTypes.INTEGER,
    price_sell: DataTypes.DECIMAL,
    display_product: DataTypes.BOOLEAN,
    display_stock: DataTypes.BOOLEAN,
    recomendation_product: DataTypes.BOOLEAN,
    image_product: DataTypes.STRING,
    description_product: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProductModels',
    tableName: "table_product",
    timestamps: false
  });
  return ProductModels;
};