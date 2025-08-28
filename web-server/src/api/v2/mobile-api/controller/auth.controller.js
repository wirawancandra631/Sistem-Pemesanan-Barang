const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const JWTCONFIG = require("../../../../config/jwt")
const { CustomerModels } = require("../../../../sequelize/db/models/index")
async function login(req, res) {
    try {
        const { number_phone, password } = req.body;
        const hasCustomer = await CustomerModels.findOne({
            where: {
                number_phone: number_phone,
            },
        });
        if (hasCustomer) {
            const matchPassword = await bcrypt.compare(
                String(password),
                hasCustomer.password
            );
            const token = jwt.sign(
                {
                    data: hasCustomer.id_customer,
                },
                JWTCONFIG.secretKey,
                {
                    expiresIn: JWTCONFIG.expIn,
                }
            );
            if (matchPassword) {
                res.status(200).json({
                    status: 200,
                    message: "success",
                    token,
                });
            } else {
                res.status(401).json({
                    status: 401,
                    message: "Periksa Kembali Password",
                });
            }
        } else {
            res.status(401).json({
                status: 401,
                message: `Nomor Hp Tidak Terdaftar`,
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function registrasi(req, res) {
    try {
        const { name_customer, number_phone, password } = req.body;
        const hasCustomer = await CustomerModels.findOne({
            where: {
                number_phone: number_phone,
            }
        });
        if (hasCustomer) {
            res.status(401).json({
                status: 401,
                message: "Nomor HP Sudah Terdaftar",
            });
        } else {
            hashPassword = await bcrypt.hash(String(password), 10);
            const customerCreated = await CustomerModels.create({
                name_customer,
                number_phone,
                password: hashPassword,
            });
            const token = jwt.sign(
                {
                    data: customerCreated.id_customer,
                },
                JWTCONFIG.secretKey,
                {
                    expiresIn: JWTCONFIG.expIn,
                }
            );
            res.json({
                status: 200,
                message: "success",
                token,
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
module.exports = {
    loginController: login,
    registrasiController: registrasi
}