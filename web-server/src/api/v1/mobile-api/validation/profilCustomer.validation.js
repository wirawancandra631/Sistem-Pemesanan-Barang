const { body } = require("express-validator");

const UpdateProfilCustomerValidation = [
    body("name_customer").notEmpty(),
    body("number_phone").notEmpty(),

]
module.exports = {
    UpdateProfilCustomerValidation
}