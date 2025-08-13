const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const UserModel = sequelize.define("UserModel", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_profil: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "table_user",
    timestamps: false
});
module.exports = UserModel;
