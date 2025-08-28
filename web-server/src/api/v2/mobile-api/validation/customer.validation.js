const { body } = require("express-validator")
const validationMiddleware = require("../../../../middleware/validation.middleware")
const Update = [
    body("name_customer").notEmpty(),
    body("number_phone").notEmpty(),

    validationMiddleware

]
module.exports = {
    UpdateCustomerProfilValidation: Update
}