const { body } = require("express-validator");
const { UserAppModels } = require("../../../../sequelize/db/models/index")
const validationMiddleware = require("../../../../middleware/validation.middleware");

const Store = [
    body("email").notEmpty().custom(async value => {
        const hasUser = await UserAppModels.findOne({
            where: {
                email: value
            }
        })
        if (hasUser) {
            throw Error("Email terdaftar");
        }
    }),
    body("password").notEmpty(),
    validationMiddleware
]
const Update = [
    body("email").notEmpty(),
    validationMiddleware
]

module.exports = {
    StoreUserAppValidation: Store,
    UpdateUserAppValidation: Update
}