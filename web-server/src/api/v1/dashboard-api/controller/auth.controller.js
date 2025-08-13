const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { UserModel } = require("../../../../database/loader");
const JWTCONFIG = require("../../../../config/jwt");
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            const matchPassword = await bcrypt.compare(password, user.password);
            if (matchPassword) {
                const token = jwt.sign({
                    data: user.id_user
                }, JWTCONFIG.secretKey, {
                    expiresIn: JWTCONFIG.expIn
                })
                res.json({
                    status: 200,
                    message: "Login sukess",
                    token
                })
            }
            else {
                res.status(422).json({
                    status: 422,
                    message: "Periksa password"
                })
            }
        }
        else {
            res.status(422).json({
                status: 422,
                message: "Email tidak ditemukan"
            })
        }

    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
module.exports = {
    authLoginController: login
}