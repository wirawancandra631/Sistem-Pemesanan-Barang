const bcrypt = require("bcrypt");
const { UserAppModels } = require("../../../../sequelize/db/models")

async function index(req, res) {
    try {
        const userData = await UserAppModels.findAll({
            attributes: ["id_user", "email", "image_profil"]
        });
        res.status(200).json({
            status: 200,
            message: "success",
            data: userData
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function store(req, res) {
    try {
        const { email, password } = req.body;
        await UserAppModels.create({
            email,
            password: await bcrypt.hash(String(password), 10)
        })
        res.status(200).json({
            status: 200,
            message: "success",
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function show(req, res) {
    try {
        const { user_id } = req;
        const userData = await UserAppModels.findOne({
            where: {
                id_user: user_id
            },
            attributes: ["id_user", "email", "image_profil"]
        });
        res.status(200).json({
            status: 200,
            message: "success",
            data: userData
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function update(req, res) {
    try {
        const { user_id } = req;
        const { email, password } = req.body;
        const userData = await UserAppModels.findOne({
            where: {
                id_user: user_id
            },
        });
        if (userData) {
            if (email != userData.email) {
                const hasData = await UserAppModels.findOne({ where: { email } })
                if (hasData) {
                    res.status(422).json({
                        status: 422,
                        message: "Email telah terdaftar"
                    })
                }
            }
            userData.update({
                email,
                password: (password) ? await bcrypt.hash(String(password), 10) : userData.password
            })


            res.status(200).json({
                status: 200,
                message: "success",
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: "Data user tidak ditemukan"
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
async function destroy(req, res) {
    try {
        const { id } = req.params;
        await UserAppModels.destroy({
            where: {
                id_user: id
            }
        })
        res.status(200).json({
            status: 200,
            message: "success",
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
module.exports = {
    userAppIndexController: index,
    showUserAppController: show,
    updateUserAppController: update,
    userAppStoreController: store,
    destroyUserAppController: destroy
}