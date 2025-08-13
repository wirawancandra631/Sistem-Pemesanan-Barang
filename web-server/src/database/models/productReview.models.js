const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")
const ProductModel = require("./product.models")
const CustomerModel = require("./customer.models")
const ProductReviewModel = sequelize.define("ProductReviewModel", {
    id_review: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductModel,
            key: "id_product",

        },
        onUpdate: "cascade",
        onDelete: "cascade"
    },
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CustomerModel,
            key: "id_customer"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
    },
    publish_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "table_review_product",
    timestamps: false
})
module.exports = ProductReviewModel;