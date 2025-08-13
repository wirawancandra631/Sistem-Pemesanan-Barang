const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize")
const CategoryProductModel = sequelize.define("CategoryProductModel", {
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon_category: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "table_category_product",
    timestamps: false
})

module.exports = CategoryProductModel;