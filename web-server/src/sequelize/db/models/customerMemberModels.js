'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerMemberModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomerMemberModels.init({
    id_member: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: DataTypes.INTEGER,
    member_type: DataTypes.ENUM(["GOLD", "MITRA"]),
    member_point: DataTypes.INTEGER,
    last_updated: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'CustomerMemberModels',
    tableName: "table_customer_member",
    timestamps: false
  });
  return CustomerMemberModels;
};