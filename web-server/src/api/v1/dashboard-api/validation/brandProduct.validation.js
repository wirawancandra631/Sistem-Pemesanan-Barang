const { body } = require("express-validator");

const StoreBrandProductValidation = [
    body("name_brand").notEmpty()
]
const UpdateBrandProductValidation = [
    body("name_brand").notEmpty()
]



module.exports = {
    StoreBrandProductValidation,
    UpdateBrandProductValidation
}