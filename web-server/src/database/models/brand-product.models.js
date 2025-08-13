const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const BrandProductModel = sequelize.define("BrandProductModel", {
    id_brand: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_brand: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "table_brand_product",
    timestamps: false

})

module.exports = BrandProductModel;