const { DataTypes } = require("sequelize");
const ProductModel = require("./product.models");
const sequelize = require("../sequelize");

const ProductPriceGrosirModel = sequelize.define("ProductPriceGrosirModel", {
    id_grosir: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductModel,
            key: "id_product"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    min_qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price_grosir: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: "table_price_grosir",
    timestamps: false
})

module.exports = ProductPriceGrosirModel;