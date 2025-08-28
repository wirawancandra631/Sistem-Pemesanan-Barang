const { sequelize } = require("../sequelize/db/models/index");

async function DatabaseMiddleware(req, res, next) {
    try {
        await sequelize.authenticate()
        console.log("***Database connected**");
        next()
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
module.exports = DatabaseMiddleware