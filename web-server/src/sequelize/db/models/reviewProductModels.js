'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewProductModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewProductModels.belongsTo(models.CustomerModels, {
        foreignKey: "customer_id",
        as: "customer"
      })
      // define association here
    }
  }
  ReviewProductModels.init({
    id_review: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    publish_at: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'ReviewProductModels',
    tableName: "table_review_product",
    timestamps: false
  });
  return ReviewProductModels;
};