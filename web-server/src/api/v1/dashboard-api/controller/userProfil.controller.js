const { UserModel } = require("../../../../database/loader")
const bcrypt = require("bcrypt")
async function getUserProfilController(req, res) {
    try {
        const { user_id } = req;
        const userProfil = await UserModel.findOne({
            where: {
                id_user: user_id
            },
            attributes: ["id_user", "email"]
        })
        if (userProfil) {
            res.json({
                status: 200,
                message: "success",
                data: userProfil
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: "User tidak ditemukan"
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
async function updateUserProfilController(req, res) {
    try {
        const { user_id } = req;
        const { email, password } = req.body;
        const userProfil = await UserModel.findOne({
            where: {
                id_user: user_id
            },
        })
        if (userProfil) {
            let newPassword = (password) ? await bcrypt.hash(password, 10) : userProfil.password;
            let newEmail = (email) ? email : userProfil.email;
            userProfil.update({
                email: newEmail,
                password: newPassword
            })
            res.json({
                status: 200,
                message: "success",
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: "User tidak ditemukan"
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
    getUserProfilController,
    updateUserProfilController
}