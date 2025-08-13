const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const CategoryProductModel = require("./category-product.models");
const BrandProductModel = require("./brand-product.models")
const ProductModel = sequelize.define("ProductModel", {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sku_product: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name_product: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: CategoryProductModel,
            key: "id_category"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },

    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: BrandProductModel,
            key: "id_brand"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },
    price_sell: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock_product: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,

    },
    image_product: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description_product: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    display_product: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    display_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    recomendation_product: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: "table_product",
    timestamps: false
})




module.exports = ProductModel;