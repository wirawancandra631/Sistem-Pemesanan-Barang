'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BrandProductModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BrandProductModels.init({
    id_brand: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name_brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BrandProductModels',
    tableName: "table_brand_product",
    timestamps: false
  });
  return BrandProductModels;
};