const { body } = require("express-validator");

const AuthValidation = [
    body("email").notEmpty(),
    body("password").notEmpty()
]
module.exports = {
    AuthValidation
}