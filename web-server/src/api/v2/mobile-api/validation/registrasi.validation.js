const { body } = require("express-validator")
const validationMiddleware = require("../../../../middleware/validation.middleware")
const Store = [
    body("name_customer").notEmpty(),
    body("number_phone").notEmpty(),
    body("password").notEmpty(),
    validationMiddleware
]
module.exports = {
    StoreRegistrasiValidation: Store
}