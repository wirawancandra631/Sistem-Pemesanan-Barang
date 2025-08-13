const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")
const ProductModel = require("./product.models")
const CustomerModel = require("./customer.models")
const ProductCartModel = sequelize.define("ProductCartModel", {
    id_cart: {
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
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "table_cart_product",
    timestamps: false
})
module.exports = ProductCartModel;