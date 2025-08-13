const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const CustomerModel = sequelize.define("CustomerModel", {
    id_customer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_customer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image_profil: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "table_customer",
    timestamps: false
})
module.exports = CustomerModel;