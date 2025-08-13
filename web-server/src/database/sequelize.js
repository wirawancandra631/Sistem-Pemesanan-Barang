const { Sequelize } = require("sequelize");
//constanta untuk membuka koneksi ke database
const sequelize = new Sequelize("sistem_pemesanan_barang", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging: process.env.ENV == "DEVELOPMENT" ? true : false
})

module.exports = sequelize