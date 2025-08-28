const { body } = require("express-validator");
const validationMiddleware = require("../../../../middleware/validation.middleware");

const Store = [
    body("email").notEmpty(),
    body("password").notEmpty(),
    validationMiddleware
]
module.exports = {
    AuthStoreValidation: Store
}