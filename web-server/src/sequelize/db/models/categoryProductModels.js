'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryProductModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoryProductModels.init({
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name_category: DataTypes.STRING,
    icon_category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoryProductModels',
    tableName: "table_category_product",
    timestamps: false
  });
  return CategoryProductModels;
};