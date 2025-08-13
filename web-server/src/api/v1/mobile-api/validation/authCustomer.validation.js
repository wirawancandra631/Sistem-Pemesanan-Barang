const { body } = require("express-validator");

const LoginAuthValidation = [
    body("number_phone").notEmpty(),
    body("password").notEmpty()
]
const RegistrasiAuthValidation = [
    body("name_customer").notEmpty(),
    body("number_phone").notEmpty(),
    body("password").notEmpty()
]

module.exports = {
    LoginAuthValidation,
    RegistrasiAuthValidation
}