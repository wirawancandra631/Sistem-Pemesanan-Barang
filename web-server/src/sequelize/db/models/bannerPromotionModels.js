'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BannerPromotionModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BannerPromotionModels.init({
    id_banner: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image_banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BannerPromotionModels',
    tableName: "table_banner_promotion",
    timestamps: false
  });
  return BannerPromotionModels;
};