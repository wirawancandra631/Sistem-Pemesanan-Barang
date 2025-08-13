const { CustomerModel } = require("../../../../database/loader");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTCONFIG = require("../../../../config/jwt");
async function loginController(req, res) {
    try {
        let { number_phone, password } = req.body;
        const hasCustomer = await CustomerModel.findOne({
            where: {
                number_phone: number_phone,
            },
        });
        if (hasCustomer) {
            password = String(password);
            const matchPassword = await bcrypt.compare(
                password,
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
            res.status(404).json({
                status: 404,
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
async function registrasiController(req, res) {
    try {
        let { name_customer, number_phone, password } = req.body;
        const hasCustomer = await CustomerModel.findOne({
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
            password = String(password);
            hashPassword = await bcrypt.hash(password, 10);
            const customerCreated = await CustomerModel.create({
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
    loginController,
    registrasiController,
};
