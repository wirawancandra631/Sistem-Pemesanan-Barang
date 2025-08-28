const { body } = require("express-validator");
const validationMiddleware = require("../../../../middleware/validation.middleware")
const Store = [
    body("number_phone").notEmpty(),
    body("password").notEmpty(),
    validationMiddleware

]
module.exports = {
    StoreLoginValidation: Store
}